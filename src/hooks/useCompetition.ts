// hooks/useCompetition.ts
import {useEffect, useState} from 'react';
import {Competition, LeaderboardEntry} from '@/types';
import {competitionService} from '@/services/competitions';

export function useCompetitions(params?: {
    search?: string;
    difficulty?: string;
    status?: string;
    sortBy?: string;
}) {
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await competitionService.getCompetitions(params);
                setCompetitions(data);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch competitions'));
            } finally {
                setLoading(false);
            }
        };

        fetchCompetitions();
    }, [params?.search, params?.difficulty, params?.status, params?.sortBy]);

    return {competitions, loading, error};
}

export function useCompetitionDetail(id: number) {
    const [competition, setCompetition] = useState<Competition | null>(null);
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<Error | null>(null);

    useEffect(() => {
        const fetchCompetitionData = async () => {
            try {
                setLoading(true);
                setError(null);
                const [competitionData, leaderboardData] = await Promise.all([
                    competitionService.getCompetition(id),
                    competitionService.getLeaderboard(id)
                ]);
                setCompetition(competitionData);
                setLeaderboard(leaderboardData);
            } catch (err) {
                setError(err instanceof Error ? err : new Error('Failed to fetch competition data'));
            } finally {
                setLoading(false);
            }
        };

        fetchCompetitionData();
    }, [id]);

    return {competition, leaderboard, loading, error};
}