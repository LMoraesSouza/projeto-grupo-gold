import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import authService from '@/services/auth';
import { LoginRequest, RegisterRequest } from '@/types/requests';
import { User } from '@/types/entities';
import Cookies from 'js-cookie'

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
                    if (Cookies.get('userData')) {
                        setUser(JSON.parse(Cookies.get('userData') as string));
                        return;
                    }
                    const userData = await authService.getCurrentUser();
                    setUser(userData);
                    Cookies.set('userData', JSON.stringify(userData));
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
            console.log(email, password, role)
            const result = await authService.login({ email, password, role });
            setUser(result.user);
            Cookies.set('userData', JSON.stringify(result.user));
            if (result.user.role === 'ADMIN') {
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
            Cookies.set('userData', JSON.stringify(result.user));
            if (result.user.role === 'ADMIN') {
                router.push('/admin/agendamentos');
            }
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
            Cookies.remove('userData');
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