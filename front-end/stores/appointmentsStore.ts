import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Appointment } from '@/types/entities';
import { CreateAppointmentRequest, UpdateAppointmentRequest } from '@/types/requests';
import { appointmentsService } from '@/services/appointments';
import Cookies from 'js-cookie';

interface AppointmentStore {
    appointments: Appointment[] | null;
    loading: boolean;
    error: string | null;
    setAppointments: (appointments: Appointment[] | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    getMyAppointments: () => Promise<void>;
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

            getMyAppointments: async () => {
                try {
                    set({ loading: true, error: null });
                    const userCookies = Cookies.get('userData')

                    let userData = null;

                    if (userCookies) {
                        userData = JSON.parse(userCookies);
                    }

                    let appointmentsData: Appointment[] = [];

                    if (userData?.role === 'CLIENT') {
                        console.log(userData)
                        appointmentsData = await appointmentsService.getByClient(userData.id);
                    } else {
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
                    console.error('Erro em getMyAppointments:', error);
                }
            },

            createAppointment: async (data: CreateAppointmentRequest) => {
                try {
                    set({ loading: true, error: null });

                    await appointmentsService.create(data);


                    await get().getMyAppointments();

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
                        await get().getMyAppointments();
                    }

                    // Depois sincroniza com o servidor
                    await get().getMyAppointments();

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