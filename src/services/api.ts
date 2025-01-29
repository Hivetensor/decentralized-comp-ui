import {API_CONFIG} from '@/config/api';

export const api = {
    users: {
        register: async (data: { username: string, walletAddress: string }) => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/users/register`, {
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
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Host registration failed');
            }
            return response.json();
        },

        createCompetition: async (hostId: number, data: any) => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/hosts/${hostId}/create-competition`, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const error = await response.json();
                throw new Error(error.detail || 'Failed to create competition');
            }
            return response.json();
        }
    },

    competitions: {
        getAll: async () => {
            const response = await fetch(`${API_CONFIG.BASE_URL}/competitions`);
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
        }
    }
};