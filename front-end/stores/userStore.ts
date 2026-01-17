import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User } from '@/types/entities';
import { CreatePermissionRequest, UpdatePermissionRequest, UpdateUserRequest } from '@/types/requests';
import { usersService } from '@/services/users';

interface UserStore {
    users: User[] | null;
    loading: boolean;
    error: string | null;
    setUsers: (users: User[] | null) => void;
    setLoading: (loading: boolean) => void;
    setError: (error: string | null) => void;
    getUsers: () => Promise<void>;
    updateUser: (userId: number, data: UpdateUserRequest,) => Promise<void>;
    updateUserPermissions: (data: CreatePermissionRequest | UpdatePermissionRequest, id?: number) => Promise<void>;
    reset: () => void;
}

export const useUserStore = create<UserStore>()(
    persist(
        (set, get) => ({
            users: null,
            loading: false,
            error: null,

            setUsers: (users) => set({ users }),
            setLoading: (loading) => set({ loading }),
            setError: (error) => set({ error }),

            clearError: () => set({ error: null }),

            reset: () => set({
                users: null,
                loading: false,
                error: null
            }),

            getUsers: async () => {
                try {
                    set({ loading: true, error: null });

                    const usersData = await usersService.getAll();
                    set({
                        users: [...usersData],
                        loading: false
                    });

                } catch (error) {
                    set({
                        error: 'Erro ao carregar agendamentos',
                        loading: false
                    });
                    console.error('Erro em getUsers:', error);
                }
            },

            updateUser: async (id: number, data: UpdateUserRequest) => {
                try {
                    set({ loading: true, error: null });

                    await usersService.update(id, data);
                    const currentUsers = get().users;

                    if (currentUsers) {
                        await get().getUsers();
                    }

                    // Depois sincroniza com o servidor
                    await get().getUsers();

                } catch (err) {
                    set({
                        error: 'Erro ao atualizar agendamento',
                        loading: false
                    });
                    console.error('Erro em updateUser:', err);
                }
            },
            updateUserPermissions: async (data: UpdatePermissionRequest, id?: number) => {
                try {
                    set({ loading: true, error: null });
                    if (id) {
                        await usersService.updatePermissions(id, data);

                    } else {
                        await usersService.createPermission(data);
                    }
                    const currentUsers = get().users;

                    if (currentUsers) {
                        await get().getUsers();
                    }

                    // Depois sincroniza com o servidor
                    await get().getUsers();

                } catch (err) {
                    set({
                        error: 'Erro ao atualizar agendamento',
                        loading: false
                    });
                    console.error('Erro em updateUser:', err);
                }
            },
        }),
        {
            name: 'user-storage',
            partialize: (state) => ({
                users: state.users
            }),
        }
    )
);