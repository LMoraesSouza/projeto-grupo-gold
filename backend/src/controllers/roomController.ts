import { Request, Response } from 'express';
import Room from '../models/Room';

export const getAllRooms = async (req: Request, res: Response): Promise<void> => {
    try {
        const rooms = await Room.findAll();
        res.status(200).json(rooms);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching rooms' });
    }
};

export const createRoom = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        const room = await Room.create({ name });
        res.status(201).json(room);
    } catch (error) {
        res.status(500).json({ error: 'Error creating room' });
    }
};