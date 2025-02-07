// contexts/AuthContext.tsx
import {createContext, useContext, useEffect, useState} from 'react';
import {api} from '@/services/api';
import {AuthUser} from "@/types";

interface AuthContextType {
    user: AuthUser | null;
    isLoading: boolean;
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

    useEffect(() => {
        // Check session on mount
        setIsLoading(true);
        api.users.getProfile()
            .then(user => {
                if (user) {
                    setUser({type: 'competitor', data: user});
                }
            })
            .catch(() => {
                // Try host profile if user profile fails
                api.hosts.getProfile()
                    .then(host => {
                        if (host) {
                            setUser({type: 'host', data: host});
                        }
                    })
                    .catch(() => setUser(null))
            })
            .finally(() => setIsLoading(false));
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

    const logout = async () => {
        await api.users.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout, isLoading }}>
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