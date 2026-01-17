import { useState, useEffect, useCallback } from 'react';
import { CreateAppointmentRequest, UpdateAppointmentRequest } from '@/types/requests';
import { Appointment } from '@/types/entities';
import { appointmentsService } from '@/services/appointments';
import { useAuth } from './useAuth';

export const useAppointments = () => {
    const [appointments, setAppointments] = useState<Appointment[] | null>(null);
    const { user } = useAuth();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Carregar agendamentos ao iniciar
    const getAppointments = useCallback(async () => {
        try {
            console.log(user)
            if (user?.id) {
                setLoading(true)
                const appointmentsData = user?.role == 'ADMIN' ? await appointmentsService.getAll() : await appointmentsService.getByClient(user?.id);
                console.log(appointmentsData, user?.id, user?.role);
                setAppointments([...appointmentsData]);
            }


        } catch (err) {
            if (err) {
                setError('Erro ao carregar usuário');
            }
        }

        setLoading(false);
    }, [user?.id, user?.role]);

    useEffect(() => {
        getAppointments();
    }, [getAppointments]);

    const createAppointment = async (data: CreateAppointmentRequest) => {
        setLoading(true);
        setError(null);
        try {
            await appointmentsService.create(data);
            getAppointments();
        } catch (err: unknown) {
            setError((err as Error).message || 'Erro no logout');
        } finally {
            setLoading(false);
        }
    };

    const updateAppointment = async (id: number, data: UpdateAppointmentRequest) => {
        setLoading(true);
        setError(null);
        try {
            await appointmentsService.update(id, data);

            getAppointments()


        } catch (err: unknown) {
            setError((err as Error).message || 'Erro no logout');
        } finally {
            setLoading(false);
        }
    };

    return {
        appointments,
        loading,
        error,
        getAppointments,
        createAppointment,
        updateAppointment
    };
};