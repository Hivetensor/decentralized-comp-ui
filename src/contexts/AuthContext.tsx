'use client';
import {createContext, useContext, useEffect, useState} from 'react';
import {api} from '@/services/api';
import {AuthUser} from "@/types";

interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
    register: {
        competitor: (username: string, walletAddress: string) => Promise<void>;
        host: (username: string, organization: string, contactName: string) => Promise<void>;
    };
    login: {
        competitor: (username: string, walletAddress: string) => Promise<void>;
        host: (email: string, organization: string, contactName: string) => Promise<void>;
    };
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<AuthUser | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // contexts/AuthContext.tsx
    useEffect(() => {
        const checkSession = async () => {
            try {
                setIsLoading(true);
                const response = await api.users.getProfile();
                if (response) {
                    setUser({ type: 'competitor', data: response });
                }
            } catch (userError) {
                try {
                    const hostResponse = await api.hosts.getProfile();
                    if (hostResponse) {
                        setUser({ type: 'host', data: hostResponse });
                    }
                } catch (hostError) {
                    setUser(null);
                }
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, []);
    const login = {
        competitor: async (username: string, walletAddress: string) => {
            const response = await api.users.login({ username, walletAddress });
            const userData = await api.users.getProfile();
            setUser({ type: 'competitor', data: userData });
        },
        host: async (email: string, organization: string, contactName: string) => {
            const response = await api.hosts.login({ email, organization, contactName });
            const hostData = await api.hosts.getProfile();
            setUser({ type: 'host', data: hostData });
        }
    };

    const register = {
        competitor: async (username: string, walletAddress: string) => {
            await api.users.register({username, walletAddress});
            // After registration, automatically log them in
            const userData = await api.users.login({username, walletAddress});
            setUser({type: 'competitor', data: userData});
        },
        host: async (email: string, organization: string, contactName: string) => {
            await api.hosts.register({email, organization, contactName});
            const hostData = await api.hosts.login({email, organization, contactName});
            setUser({type: 'host', data: hostData});
        }
    };

    const logout = async () => {
        await api.users.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{user, register, login, logout, isLoading}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};