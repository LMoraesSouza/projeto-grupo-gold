import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Appointment } from '@/types/entities';
import { CreateAppointmentRequest, UpdateAppointmentRequest } from '@/types/requests';
import { appointmentsService } from '@/services/appointments';

interface AppointmentStore {
    appointments: Appointment[] | null;
    loading: boolean;
    error: string | null;
    setAppointments: (appointments: Appointment[] | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    getAppointments: (userId?: number, userRole?: string) => Promise<void>;
    createAppointment: (data: CreateAppointmentRequest) => Promise<void>;
    updateAppointment: (id: number, data: UpdateAppointmentRequest) => Promise<void>;
    reset: () => void;
}

export const useAppointmentStore = create<AppointmentStore>()(
    persist(
        (set, get) => ({
            appointments: null,
            loading: false,
            error: null,

            setAppointments: (appointments) => set({ appointments }),
            setLoading: (loading) => set({ loading }),
            setError: (error) => set({ error }),

            clearError: () => set({ error: null }),

            reset: () => set({
                appointments: null,
                loading: false,
                error: null
            }),

            getAppointments: async (userId?, userRole?) => {
                try {
                    set({ loading: true, error: null });

                    let appointmentsData: Appointment[] = [];

                    if (userId) {
                        if (userRole === 'ADMIN') {
                            appointmentsData = await appointmentsService.getAll();
                        } else {
                            appointmentsData = await appointmentsService.getByClient(userId);
                        }
                    } else {
                        //se der erro no id busca todos, mas o backend precisa de autenticação
                        appointmentsData = await appointmentsService.getAll();
                    }

                    set({
                        appointments: [...appointmentsData],
                        loading: false
                    });

                } catch (error) {
                    set({
                        error: 'Erro ao carregar agendamentos',
                        loading: false
                    });
                    console.error('Erro em getAppointments:', error);
                }
            },

            createAppointment: async (data: CreateAppointmentRequest) => {
                try {
                    set({ loading: true, error: null });

                    await appointmentsService.create(data);


                    await get().getAppointments();

                } catch (err) {
                    set({
                        error: 'Erro ao criar agendamento',
                        loading: false
                    });
                    console.error('Erro em createAppointment:', err);
                }
            },

            updateAppointment: async (id: number, data: UpdateAppointmentRequest) => {
                try {
                    set({ loading: true, error: null });

                    await appointmentsService.update(id, data);

                    const currentAppointments = get().appointments;
                    if (currentAppointments) {
                        await get().getAppointments();
                    }

                    // Depois sincroniza com o servidor
                    await get().getAppointments();

                } catch (err) {
                    set({
                        error: 'Erro ao atualizar agendamento',
                        loading: false
                    });
                    console.error('Erro em updateAppointment:', err);
                }
            }
        }),
        {
            name: 'appointment-storage',
            partialize: (state) => ({
                appointments: state.appointments
            }),
        }
    )
);