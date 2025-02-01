'use client';

import React, {createContext, useContext, useEffect, useState} from 'react';

interface User {
    username: string;
    walletAddress: string;
    joinedAt: string;
    competitions: {
        id: number;
        title: string;
        status: 'active' | 'completed';  // This is the strict type
        joinedAt: string;
    }[];
}

interface UserContextType {
    user: User | null;
    registerUser: (username: string, walletAddress: string) => void;
    joinCompetition: (competitionId: number, competitionTitle: String) => void;
    isInCompetition: (competitionId: number) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({children}: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        if (savedUser) {
            setUser(JSON.parse(savedUser));
        }
    }, []);

    const registerUser = (username: string, walletAddress: string) => {
        const newUser = {
            username,
            walletAddress,
            joinedAt: new Date().toISOString(),
            competitions: []
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const joinCompetition = (competitionId: number, competitionTitle: string = '') => {
        if (!user) return;

        const updatedUser: User = {
            ...user,
            competitions: [
                ...user.competitions,
                {
                    id: competitionId,
                    title: competitionTitle,
                    status: 'active',
                    joinedAt: new Date().toISOString()
                }
            ]
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const isInCompetition = (competitionId: number) => {
        return user?.competitions.some(comp => comp.id === competitionId) ?? false;
    };

    return (
        <UserContext.Provider value={{user, registerUser, joinCompetition, isInCompetition}}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if (context === undefined) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
}