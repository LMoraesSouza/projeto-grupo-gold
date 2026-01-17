import { Request, Response } from 'express';
import Permission from '../models/Permission';

export const getAllPermissions = async (req: Request, res: Response): Promise<void> => {
    try {
        const permissions = await Permission.findAll();
        res.status(200).json(permissions);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching permissions' });
    }
};

export const getPermisionByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const permissions = await Permission.findAll();
        res.status(200).json(permissions);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching permissions' });
    }
};

export const updatePermission = async (req: Request, res: Response): Promise<void> => {
    try {
        const { isActive } = req.body;
        const { id } = req.params;

        const permission = await Permission.findByPk(id);

        if (!permission) {
            res.status(404).json({ error: 'Appointment not found' });
            return;
        }

        permission.isActive = isActive;
        await permission.save();

        res.status(201).json(permission);
    } catch (error) {
        res.status(500).json({ error: 'Error creating permission' });
    }
};

export const createPermission = async (req: Request, res: Response): Promise<void> => {
    try {
        const { access, isActive, userId } = req.body;
        const permission = await Permission.create({ access, isActive, userId });
        res.status(201).json(permission);
    } catch (error) {
        res.status(500).json({ error: 'Error creating permission' });
    }
};