import {useEffect, useState} from 'react';
import {UserProfile} from '@/types';
import {api} from '@/api';

export function useProfile(username: string) {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await api.users.getProfile(username);
                setProfile(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch profile'));
            } finally {
                setLoading(false);
            }
        };

        if (username) {
            fetchProfile();
        }
    }, [username]);

    return {profile, loading, error};
}