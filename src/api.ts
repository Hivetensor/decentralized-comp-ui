import { Competition, LeaderboardEntry, UserProfile } from './types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

export const api = {
  competitions: {
    getCompetitions: async (params?: {
      search?: string;
      difficulty?: string;
      status?: string;
      sortBy?: string;
    }): Promise<Competition[]> => {
      const queryParams = new URLSearchParams();
      if (params?.search) queryParams.append('search', params.search);
      if (params?.difficulty) queryParams.append('difficulty', params.difficulty);
      if (params?.status) queryParams.append('status', params.status);
      if (params?.sortBy) queryParams.append('sortBy', params.sortBy);

      const response = await fetch(
        `${API_BASE_URL}/competitions?${queryParams.toString()}`
      );
      if (!response.ok) {
        throw new Error('Failed to fetch competitions');
      }
      return response.json();
    },

    getCompetition: async (id: number): Promise<Competition> => {
      const response = await fetch(`${API_BASE_URL}/competitions/${id}`);
      if (!response.ok) {
        throw new Error('Failed to fetch competition');
      }
      return response.json();
    },

    getLeaderboard: async (competitionId: number): Promise<LeaderboardEntry[]> => {
      const response = await fetch(`${API_BASE_URL}/competitions/${competitionId}/leaderboard`);
      if (!response.ok) {
        throw new Error('Failed to fetch leaderboard');
      }
      return response.json();
    },
    createCompetition: async (data: {
      title: string;
      description: string;
      prize: string;
      difficulty: string;
      startDate: string;
      datasetDescription: string;
      evaluationMetric: string;
      submissionFormat: string;
      tags: string[];
      rules: string[];
    }): Promise<Competition> => {
      const response = await fetch(`${API_BASE_URL}/competitions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data)
      });
      
      if (!response.ok) {
        throw new Error('Failed to create competition');
      }
      
      return response.json();
    }
  },

  users: {
    getProfile: async (username: string): Promise<UserProfile> => {
      const response = await fetch(`${API_BASE_URL}/users/${username}`);
      if (!response.ok) {
        throw new Error('Failed to fetch user profile');
      }
      return response.json();
    }
  }
};