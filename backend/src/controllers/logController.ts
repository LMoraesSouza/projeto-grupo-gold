import { Request, Response } from 'express';
import Log from '../models/Log';
import User from '../models/User';

export const getAllLogs = async (req: Request, res: Response): Promise<void> => {
    try {
        const logss = await Log.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes: ['name', 'lastName']
            }]
        });
        res.status(200).json(logss);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching logss' });
    }
};

export const getLogByUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;
        const logss = await Log.findAll({
            include: [{
                model: User,
                as: 'user',
                attributes: ['name']
            }],
            where: {
                userId
            }
        });
        res.status(200).json(logss);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching logss' });
    }
};

export const updateLogs = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;

        const logs = await Log.findByPk(id);

        if (!logs) {
            res.status(404).json({ error: 'Appointment not found' });
            return;
        }


        await logs.save();

        res.status(201).json(logs);
    } catch (error) {
        res.status(500).json({ error: 'Error creating logs' });
    }
};

export const logActivity = async (activityDescription: string, moduleName: "appointments" | "my account", userId: number): Promise<void> => {
    try {

        const log = await Log.create({
            activityDescription: activityDescription,
            module: moduleName,
            userId: userId
        });

    } catch (error) {
        console.log(error)
    }
}