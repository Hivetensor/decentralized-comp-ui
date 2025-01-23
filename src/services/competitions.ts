import { Competition, LeaderboardEntry } from '@/types';
import { mockCompetitions, mockLeaderboard } from '@/mock/competitions';

// Flag to switch between mock and real API
const USE_MOCK = true;

export const competitionService = {
    getCompetitions: async (params?: {
        search?: string;
        difficulty?: string;
        status?: string;
        sortBy?: string;
    }): Promise<Competition[]> => {
        if (USE_MOCK) {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 500));

            let filtered = [...mockCompetitions];

            // Apply filters
            if (params?.search) {
                const searchLower = params.search.toLowerCase();
                filtered = filtered.filter(comp =>
                    comp.title.toLowerCase().includes(searchLower) ||
                    comp.description.toLowerCase().includes(searchLower)
                );
            }

            if (params?.difficulty) {
                filtered = filtered.filter(comp =>
                    comp.difficulty.toLowerCase() === params.difficulty?.toLowerCase()
                );
            }

            if (params?.status) {
                filtered = filtered.filter(comp =>
                    comp.status.toLowerCase() === params.status?.toLowerCase()
                );
            }

            // Apply sorting
            if (params?.sortBy) {
                filtered.sort((a, b) => {
                    switch (params.sortBy) {
                        case 'prize':
                            return parseInt(b.prize) - parseInt(a.prize);
                        case 'deadline':
                            return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
                        case 'participants':
                            return b.participants - a.participants;
                        default:
                            return 0;
                    }
                });
            }

            return filtered;
        }

        // Real API call when USE_MOCK is false
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/competitions`);
        if (!response.ok) {
            throw new Error('Failed to fetch competitions');
        }
        return response.json();
    },

    getCompetition: async (id: number): Promise<Competition> => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 500));
            const competition = mockCompetitions.find(c => c.id === id);
            if (!competition) {
                throw new Error('Competition not found');
            }
            return competition;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/competitions/${id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch competition');
        }
        return response.json();
    },

    getLeaderboard: async (competitionId: number): Promise<LeaderboardEntry[]> => {
        if (USE_MOCK) {
            await new Promise(resolve => setTimeout(resolve, 500));
            return mockLeaderboard;
        }

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/competitions/${competitionId}/leaderboard`);
        if (!response.ok) {
            throw new Error('Failed to fetch leaderboard');
        }
        return response.json();
    }
};