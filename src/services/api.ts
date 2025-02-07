// services/api.ts
import { API_CONFIG } from '@/config/api';

const makeRequest = async (endpoint: string, options: RequestInit = {}) => {
    const response = await fetch(`${API_CONFIG.BASE_URL}${endpoint}`, {
        ...options,
        credentials: 'include',
        headers: {
            'Content-Type': 'application/json',
            ...options.headers,
        }
    });

    if (!response.ok) {
        const error = await response.json().catch(() => ({ detail: 'An error occurred' }));
        throw new Error(error.detail || 'Request failed');
    }

    return response.json();
};

export const api = {
    users: {
        register: async (data: { username: string, walletAddress: string }) => {
            return makeRequest('/api/v1/users/register', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        username: data.username,
                        wallet_address:data.walletAddress,
                    }
                )
            });
        },

        login: async (data: { username: string; walletAddress: string }) => {
            return makeRequest('/api/v1/users/login', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        username: data.username,
                        wallet_address:data.walletAddress,
                    }
                )
            });
        },

        getProfile: async () => {
            return makeRequest('/api/v1/users/profile');
        },

        logout: async () => {
            return makeRequest('/api/v1/users/logout', {
                method: 'POST'
            });
        },

        registerForCompetition: async (walletAddress: string, competitionId: number) => {
            return makeRequest(`/api/v1/users/${walletAddress}/${competitionId}/register`, {
                method: 'POST'
            });
        },
    },

    hosts: {
        register: async (data: { email: string, organization: string, contactName: string }) => {
            return makeRequest('/api/v1/hosts/register', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        email: data.email,
                        organization: data.organization,
                        contact_name: data.contactName,
                    }
                )
            });
        },

        login: async (data: { email: string; organization: string; contactName: string }) => {
            return makeRequest('/api/v1/hosts/login', {
                method: 'POST',
                body: JSON.stringify(
                    {
                        email: data.email,
                        organization: data.organization,
                        contact_name: data.contactName,
                    }
                )
            });
        },

        getProfile: async () => {
            return makeRequest('/api/v1/hosts/profile');
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

            const response = await fetch(`${API_CONFIG.BASE_URL}/api/v1/hosts/create-competition`, {
                method: 'POST',
                credentials: 'include',
                body: formData,
            });

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to create competition');
            }
            return response.json();
        },
    },

    competitions: {
        getAll: async () => {
            return makeRequest('/api/v1/competitions/competitions');
        },

        getOne: async (id: number) => {
            return makeRequest(`/api/v1/competitions/${id}`);
        },

        getLeaderboard: async (competitionId: number) => {
            return makeRequest(`/api/v1/competitions/${competitionId}/leaderboard`);
        },

        getDatasetDownloadUrl: async (competitionId: number) => {
            return makeRequest(`/api/v1/competitions/${competitionId}/dataset-download-url`);
        }
    }
};