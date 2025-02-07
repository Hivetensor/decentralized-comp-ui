// services/api.ts
import {API_CONFIG} from '@/config/api';

export const api = {
    users: {
        register: async (data: { username: string, walletAddress: string }) => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/users/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Registration failed');
            }
            return response.json();
        },

        login: async (data: { username: string; walletAddress: string }) => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/users/login`, {
                method: 'POST',
                credentials: 'include', // Important for cookies
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Login failed');
            return response.json();
        },

        getProfile: async () => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/users/profile`, {
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Failed to get profile');
            return response.json();
        },

        logout: async () => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/users/logout`, {
                method: 'POST',
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Logout failed');
            return response.json();
        },

        registerForCompetition: async (walletAddress: string, competitionId: number) => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/users/${walletAddress}/${competitionId}/register`, {
                method: 'POST',
                credentials: 'include'
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Competition registration failed');
            }
            return response.json();
        },
    },

    hosts: {
        register: async (data: { email: string, organization: string, contactName: string }) => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/hosts/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Host registration failed');
            }
            return response.json();
        },

        login: async (data: { email: string; organization: string; contactName: string }) => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/hosts/login`, {
                method: 'POST',
                credentials: 'include',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error('Login failed');
            return response.json();
        },

        getProfile: async () => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/hosts/profile`, {
                credentials: 'include',
            });
            if (!response.ok) throw new Error('Failed to get profile');
            return response.json();
        },

        createCompetition: async (competitionData: any, datasetFile: File) => {
            const formData = new FormData();

            Object.keys(competitionData).forEach(key => {
                if (key === 'tags' || key === 'rules') {
                    formData.append(key, JSON.stringify(competitionData[key]));
                } else {
                    formData.append(key, competitionData[key]);
                }
            });

            formData.append('dataset_file', datasetFile);

            const response = await fetch(
                `${API_CONFIG.BASE_URL}/api/v1/hosts/create-competition`,
                {
                    method: 'POST',
                    credentials: 'include',
                    body: formData,
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to create competition');
            }
            return response.json();
        },
    },

    competitions: {
        getAll: async () => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/competitions/competitions`);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to fetch competitions');
            }
            return response.json();
        },

        getOne: async (id: number) => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/competitions/${id}`);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to fetch competition');
            }
            return response.json();
        },

        getLeaderboard: async (competitionId: number) => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/competitions/${competitionId}/leaderboard`);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to fetch leaderboard');
            }
            return response.json();
        },

        getDatasetDownloadUrl: async (competitionId: number) => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/competitions/${competitionId}/dataset-download-url`, {
                credentials: 'include'
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to fetch dataset download URL');
            }
            return response.json();
        }
    }
};