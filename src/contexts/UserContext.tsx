'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
    username: string;
    walletAddress: string;
    joinedCompetitions: number[];  // Array of competition IDs
}

interface UserContextType {
    user: User | null;
    registerUser: (username: string, walletAddress: string) => void;
    joinCompetition: (competitionId: number) => void;
    isInCompetition: (competitionId: number) => boolean;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);

    // Load user data from localStorage on mount
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
            joinedCompetitions: []
        };
        setUser(newUser);
        localStorage.setItem('user', JSON.stringify(newUser));
    };

    const joinCompetition = (competitionId: number) => {
        if (!user) return;

        const updatedUser = {
            ...user,
            joinedCompetitions: [...user.joinedCompetitions, competitionId]
        };
        setUser(updatedUser);
        localStorage.setItem('user', JSON.stringify(updatedUser));
    };

    const isInCompetition = (competitionId: number) => {
        return user?.joinedCompetitions.includes(competitionId) ?? false;
    };

    return (
        <UserContext.Provider value={{ user, registerUser, joinCompetition, isInCompetition }}>
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