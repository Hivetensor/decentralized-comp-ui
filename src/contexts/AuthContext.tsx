// contexts/AuthContext.tsx
import { createContext, useContext, useEffect, useState } from 'react';
import { api } from '@/services/api';
import { UserProfile } from '@/types';

interface AuthContextType {
    user: UserProfile | null;
    login: (username: string, walletAddress: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<UserProfile | null>(null);

    useEffect(() => {
        // Check session on mount
        api.users.getProfile()
            .then(user => setUser(user))
            .catch(() => setUser(null));
    }, []);

    const login = async (username: string, walletAddress: string) => {
        const response = await api.users.login({ username, walletAddress });
        if (response.ok) {
            const user = await api.users.getProfile();
            setUser(user);
        }
    };

    const logout = async () => {
        await api.users.logout();
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
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