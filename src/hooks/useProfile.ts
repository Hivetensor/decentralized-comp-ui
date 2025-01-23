import { useState, useEffect } from 'react';
import { UserProfile } from '@/types';

export function useProfile(walletAddress: string | null) {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const loadProfile = () => {
            if (!walletAddress) return;

            setLoading(true);
            try {
                // Try to load from localStorage
                const savedProfile = localStorage.getItem(`profile_${walletAddress}`);
                if (savedProfile) {
                    setProfile(JSON.parse(savedProfile));
                }
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to load profile'));
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [walletAddress]);

    const updateProfile = (updatedProfile: UserProfile) => {
        setProfile(updatedProfile);
        localStorage.setItem(`profile_${updatedProfile.walletAddress}`, JSON.stringify(updatedProfile));
    };

    const joinCompetition = (competitionId: number, competitionTitle: string) => {
        if (!profile) return;

        const updatedProfile = {
            ...profile,
            competitions: [
                ...profile.competitions,
                {
                    id: competitionId,
                    title: competitionTitle,
                    status: 'active',
                    joinedAt: new Date().toISOString()
                }
            ]
        };

        updateProfile(updatedProfile);
    };

    return { profile, loading, error, updateProfile, joinCompetition };
}