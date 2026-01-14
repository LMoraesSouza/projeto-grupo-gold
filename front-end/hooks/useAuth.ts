import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/auth';
import { LoginRequest, RegisterRequest } from '@/types/requests';
import { User } from '@/types/entities';

export const useAuth = () => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    // Carregar usuário ao iniciar
    useEffect(() => {
        const loadUser = async () => {
            if (authService.isAuthenticated()) {
                try {
                    const userData = await authService.getCurrentUser();
                    console.log(userData);
                    setUser(userData);
                } catch (err) {
                    if (err) {
                        setError('Erro ao carregar usuário');
                    }
                }
            }
            setLoading(false);
        };

        loadUser();
    }, []);

    // Login
    const login = async ({ email, password, role }: LoginRequest) => {

        setLoading(true);
        setError(null);

        try {
            const result = await authService.login({ email, password, role });
            setUser(result.user);
            if (result.user.role === 'admin') {
                router.push('/admin/agendamentos');
            } else {
                router.push('/agendamentos');
            }

            return result;
        } catch (err: unknown) {
            setError((err as Error).message || 'Erro no login');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Registro
    const register = async ({ name, email, password, role }: RegisterRequest) => {
        setLoading(true);
        setError(null);

        try {
            const result = await authService.register({ name, email, password, role });
            setUser(result.user);
            router.push('/agendamentos');
            return result;
        } catch (err: unknown) {
            setError((err as Error).message || 'Erro no registro');
            throw err;
        } finally {
            setLoading(false);
        }
    };

    // Logout
    const logout = async () => {
        setLoading(true);
        try {
            await authService.logout();
            setUser(null);
            router.push('/login');
        } catch (err: unknown) {
            setError((err as Error).message || 'Erro no logout');
        } finally {
            setLoading(false);
        }
    };

    return {
        user,
        loading,
        error,
        isAuthenticated: !!user,
        login,
        register,
        logout,
    };
};