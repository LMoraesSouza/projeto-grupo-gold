import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest } from '../middlewares/authMiddleware';

// gera token
export const generateToken = (userId: number, email: string, role: string): string => {
    const jwtSecret = process.env.JWT_SECRET || 'your-secret-key';

    if (!jwtSecret) {
        throw new Error('JWT_SECRET is not defined in environment variables');
    }

    return jwt.sign(
        { userId, email, role },
        jwtSecret,
        {
            expiresIn: 604800, // 7 dias
            algorithm: 'HS256'
        }
    );
};

//novo usuário
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ error: 'Email já cadastrado' });
            return;
        }

        const user = await User.create({
            name,
            email,
            password
        });

        const token = generateToken(user.id, user.email, user.role);

        // remove senha da resposta
        const jsonUser = user.toJSON();
        const { password: _, ...userResponse } = jsonUser;

        res.status(201).json({
            success: true,
            message: 'Usuário cadastrado com sucesso',
            user: userResponse,
            token
        });
    } catch (error: any) {
        console.error(error);

        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map((err: any) => ({
                field: err.path,
                message: err.message
            }));
            res.status(400).json({ error: 'Validation error', details: errors });
            return;
        }

        res.status(500).json({ error: 'Registration failed', details: error.message });
    }
};

// Login de usuário
export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password } = req.body;

        // Validar entrada
        if (!email || !password) {
            res.status(400).json({ error: 'Please provide email and password' });
            return;
        }

        // Buscar usuário
        const user = await User.findOne({ where: { email } });
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Verificar se usuário está ativo
        if (!user.isActive) {
            res.status(401).json({ error: 'Account is deactivated' });
            return;
        }

        // Verificar senha
        const isPasswordValid = await user.comparePassword(password);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        // Gerar token
        const token = generateToken(user.id, user.email, user.role);

        // Atualizar última data de login (opcional)
        // await user.update({ updatedAt: new Date() });

        // remove senha da resposta
        const jsonUser = user.toJSON();
        const { password: _, ...userResponse } = jsonUser;

        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: userResponse,
            token
        });
    } catch (error: any) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
};

// Logout (client-side apenas, token é invalidado no front)
export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        // Em uma aplicação real, você pode adicionar o token a uma blacklist
        // ou usar refresh tokens. Para JWT simples, o logout é feito no client.

        res.status(200).json({
            success: true,
            message: 'Logout successful'
        });
    } catch (error: any) {
        res.status(500).json({ error: 'Logout failed' });
    }
};

// Perfil do usuário logado
export const getProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        if (!req.user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }

        res.status(200).json({
            success: true,
            user: req.user
        });
    } catch (error: any) {
        res.status(500).json({ error: 'Failed to get profile' });
    }
};

// Atualizar perfil
export const updateProfile = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { name, email } = req.body;
        const user = req.user;

        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }

        // Verificar se email já está em uso por outro usuário
        if (email && email !== user.email) {
            const existingUser = await User.findOne({
                where: { email },
                attributes: ['id']
            });

            if (existingUser && existingUser.id !== user.id) {
                res.status(400).json({ error: 'Email already in use' });
                return;
            }
        }

        // Atualizar usuário
        await user.update({
            name: name || user.name,
            email: email || user.email
        });

        // Buscar usuário atualizado sem a senha
        const updatedUser = await User.findByPk(user.id, {
            attributes: { exclude: ['password'] }
        });

        res.status(200).json({
            success: true,
            message: 'Profile updated successfully',
            user: updatedUser
        });
    } catch (error: any) {
        console.error('Update profile error:', error);
        res.status(500).json({ error: 'Failed to update profile' });
    }
};

// Mudar senha
export const changePassword = async (req: AuthRequest, res: Response): Promise<void> => {
    try {
        const { currentPassword, newPassword } = req.body;
        const user = req.user;

        if (!user) {
            res.status(401).json({ error: 'User not found' });
            return;
        }

        // Buscar usuário com senha
        const userWithPassword = await User.findByPk(user.id);
        if (!userWithPassword) {
            res.status(404).json({ error: 'User not found' });
            return;
        }

        // Verificar senha atual
        const isPasswordValid = await userWithPassword.comparePassword(currentPassword);
        if (!isPasswordValid) {
            res.status(401).json({ error: 'Current password is incorrect' });
            return;
        }

        // Atualizar senha (o hook fará o hash)
        userWithPassword.password = newPassword;
        await userWithPassword.save();

        res.status(200).json({
            success: true,
            message: 'Password changed successfully'
        });
    } catch (error: any) {
        console.error('Change password error:', error);

        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map((err: any) => ({
                field: err.path,
                message: err.message
            }));
            res.status(400).json({ error: 'Validation error', details: errors });
            return;
        }

        res.status(500).json({ error: 'Failed to change password' });
    }
};