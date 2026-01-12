import { Request, Response } from 'express';
import User from '../models/User';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const users = await User.findAll();
        console.log(users)
        res.status(200).json(users);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching users' });
    }
};

export const createUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, email, password } = req.body;
        const user = await User.create({ name, email, password });
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};