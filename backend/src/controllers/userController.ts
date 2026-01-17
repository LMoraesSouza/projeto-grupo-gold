import { Request, Response } from 'express';
import User from '../models/User';
import Permission from '../models/Permission';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        console.log('oioioi')
        const users = await User.findAll({
            include: [{
                model: Permission,
                as: 'permissions',
                attributes: ['id', 'access', 'isActive']
            }],
        });

        res.status(200).json(users);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching appointments' });
    }
};

export const getUserById = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        const users = await User.findByPk(userId);

        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching appointments' });
    }
}

export const updateUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { isActive } = req.body;
        const { id } = req.params;

        const users = await User.findByPk(id);

        if (!users) {
            res.status(404).json({ error: 'Appointment not found' });
            return;
        }

        users.isActive = isActive;
        await users.save();

        res.status(200).json(users);

    } catch (error) {
        res.status(500).json({ error: 'Error updating appointment' });
    }
}