import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { AuthRequest } from '../middlewares/authMiddleware';
import Admin from '../models/Admin';
import { logActivity } from './logController';

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

export const getUser = async (email: string, role: string): Promise<User | Admin | null> => {

    if (role === 'admin') {
        return await Admin.findOne({ where: { email } });
    }

    return await User.findOne({ where: { email } });
}

//novo usuário
export const register = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, lastName, email, password, role, zipCode, address, number, complement, district, city, state } = req.body;

        const existingUser = await User.findOne({ where: { email, role } });
        if (existingUser) {
            res.status(400).json({ error: 'Email já cadastrado' });
            return;
        }

        const user = await User.create({
            name,
            lastName,
            email,
            role,
            password,
            zipCode,
            address,
            number,
            complement,
            district,
            city,
            state
        });

        await logActivity('Usuário criado', 'my account', user.id);

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

export const login = async (req: Request, res: Response): Promise<void> => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            res.status(400).json({ error: 'Please provide email, password, and role' });
            return;
        }

        const user = await getUser(email, role.toLowerCase());
        if (!user) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        if (!user.isActive) {
            res.status(401).json({ error: 'Account is deactivated' });
            return;
        }

        const isPasswordValid = await user.comparePassword(password);
        console.log(isPasswordValid)

        if (!isPasswordValid) {
            res.status(401).json({ error: 'Invalid credentials' });
            return;
        }

        if (role === 'client') {
            await logActivity('Login', 'my account', user.id);
        }

        const token = generateToken(user.id, user.email, user.role);

        // await user.update({ updatedAt: new Date() });

        // remove senha da resposta
        user.removePassword();
        const jsonUser = user.toJSON();

        console.log(user, jsonUser)
        res.status(200).json({
            success: true,
            message: 'Login successful',
            user: jsonUser,
            token
        });
    } catch (error: any) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed', details: error.message });
    }
};

export const logout = async (req: AuthRequest, res: Response): Promise<void> => {
    try {

        await logActivity('Logout', 'my account', req.user?.id);

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

        await logActivity('Atualização de perfil', 'my account', user.id);

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