import {API_CONFIG} from '@/config/api';

export const api = {
    users: {
        register: async (data: { username: string, walletAddress: string }) => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/users/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        username: data.username,
                        wallet_address: data.walletAddress
                    }
                )
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Registration failed');
            }
            return response.json();
        },

        registerForCompetition: async (walletAddress: string, competitionId: number) => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/users/${walletAddress}/${competitionId}/register`, {
                method: 'POST'
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Competition registration failed');
            }
            return response.json();
        }
    },

    hosts: {
        register: async (data: { email: string, organization: string, contactName: string }) => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/hosts/register`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(
                    {
                        email: data.email,
                        organization: data.organization,
                        contact_name: data.contactName
                    }
                )
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Host registration failed');
            }
            return response.json();
        },

        createCompetition: async (hostId: number, competitionData: any, datasetFile: File) => {
            const formData = new FormData();

            // Add all competition data fields
            Object.keys(competitionData).forEach(key => {
                if (key === 'tags' || key === 'rules') {
                    // Arrays need to be handled specially
                    formData.append(key, JSON.stringify(competitionData[key]));
                } else {
                    formData.append(key, competitionData[key]);
                }
            });

            // Add the file
            formData.append('dataset_file', datasetFile);

            const response = await fetch(
                `${API_CONFIG.BASE_URL}/hosts/${hostId}/create-competition`,
                {
                    method: 'POST',
                    body: formData,
                    // Don't set Content-Type header, browser will set it with boundary
                }
            );

            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to create competition');
            }
            return response.json();
        },

        getProfile: async (email: string) => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/hosts/${email}`);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to fetch host profile');
            }
            return response.json();
        }
    },

    competitions: {
        getAll: async () => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/competitions/competitions`);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to fetch competitions');
            }
            return response.json();
        },

        getOne: async (id: number) => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/competitions/${id}`);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to fetch competition');
            }
            return response.json();
        },

        getLeaderboard: async (competitionId: number) => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/competitions/${competitionId}/leaderboard`);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to fetch leaderboard');
            }
            return response.json();
        },

        getDatasetDownloadUrl: async (competitionId: number) => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/competitions/${competitionId}/dataset-download-url`);
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to fetch dataset download URL');
            }
            return response.json();
        }
    }
};