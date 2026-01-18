import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Log } from '@/types/entities';
import { logsService } from '@/services/logs';

interface LogStore {
    logs: Log[] | null;
    loading: boolean;
    error: string | null;
    setLogs: (logs: Log[] | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    getLogs: (userId?: number) => Promise<void>;
    reset: () => void;
}

export const useLogStore = create<LogStore>()(
    persist(
        (set) => ({
            logs: null,
            loading: false,
            error: null,

            setLogs: (logs) => set({ logs }),
            setLoading: (loading) => set({ loading }),
            setError: (error) => set({ error }),

            clearError: () => set({ error: null }),

            reset: () => set({
                logs: null,
                loading: false,
                error: null
            }),

            getLogs: async (userId?: number) => {
                try {
                    set({ loading: true, error: null });

                    let logsData: Log[] = [];


                    if (userId) {
                        logsData = await logsService.getById(userId);
                    } else {
                        console.log('aqui')
                        logsData = await logsService.getAll();
                    }

                    set({
                        logs: [...logsData],
                        loading: false
                    });

                } catch (error) {
                    set({
                        error: 'Erro ao carregar logs',
                        loading: false
                    });
                    console.error('Erro em getLogs:', error);
                }
            },
        }),
        {
            name: 'log-storage',
            partialize: (state) => ({
                logs: state.logs
            }),
        }
    )
);