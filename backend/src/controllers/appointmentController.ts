import { Request, Response } from 'express';
import Appointment from '../models/Appointment';
import Room from '../models/Room';
import User from '../models/User';

export const getAllAppointments = async (req: Request, res: Response): Promise<void> => {
    try {
        const appointments = await Appointment.findAll({
            include: [{
                model: Room,
                as: 'room',
                attributes: ['id', 'name']
            },
            {
                model: User,
                as: 'user',
                attributes: ['id', 'name', 'lastName']
            },
            ]
        });

        res.status(200).json(appointments);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Error fetching appointments' });
    }
};

export const getClientAppointments = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId } = req.params;

        const appointments = await Appointment.findAll({
            where: {
                userId
            },
            include: [{
                model: Room,
                as: 'room',
                attributes: ['id', 'name']
            },
            {
                model: User,
                as: 'user',
                attributes: ['id', 'name']
            }]
        });

        res.status(201).json(appointments);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching appointments' });
    }
}

export const createAppointment = async (req: Request, res: Response): Promise<void> => {
    try {
        const { userId, dateTime, roomId } = req.body;

        const appointment = await Appointment.create({ userId, dateTime, roomId });

        res.status(201).json(appointment);
    } catch (error) {
        res.status(500).json({ error: 'Error creating appointment' });
    }
};

export const updateAppointmentStatus = async (req: Request, res: Response): Promise<void> => {
    try {
        const { status } = req.body;
        const { id } = req.params;

        const appointment = await Appointment.findByPk(id);

        if (!appointment) {
            res.status(404).json({ error: 'Appointment not found' });
            return;
        }

        appointment.status = status;
        await appointment.save();

        res.status(200).json(appointment);

    } catch (error) {
        res.status(500).json({ error: 'Error updating appointment' });
    }
}