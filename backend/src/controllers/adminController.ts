import { Request, Response } from 'express';
import Admin from '../models/Admin';

export const getAllUsers = async (req: Request, res: Response): Promise<void> => {
    try {
        const admins = await Admin.findAll();
        console.log(admins)
        res.status(200).json(admins);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching users' });
    }
};

export const createAdmin = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name, lastName, email, password } = req.body;
        const admins = await Admin.create({ name, lastName, email, password });
        res.status(201).json(admins);
    } catch (error) {
        res.status(500).json({ error: 'Error creating user' });
    }
};