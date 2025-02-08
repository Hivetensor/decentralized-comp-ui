import axios from "axios";

const axiosInstance = axios.create({
    baseURL: "http://localhost:8000",  // Important: using localhost, not 127.0.0.1
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json'
    }
});
const axiosFileInstance = axios.create({
    baseURL: "http://localhost:8000",
    withCredentials: true,
});
export const api = {
    users: {
        register: async (data: { username: string, walletAddress: string }) => {
            const response = await axiosInstance.post('/api/v1/users/register', {
                username: data.username,
                wallet_address: data.walletAddress,
            });
            return response.data;
        },
        login: async (data: { username: string, walletAddress: string }) => {
            const response = await axiosInstance.post('/api/v1/users/login', {
                username: data.username,
                wallet_address: data.walletAddress,
            });
            return response.data;
        },
        getProfile: async () => {
            const response = await axiosInstance.get('/api/v1/users/profile');
            return {
                ...response.data,
                walletAddress: response.data.wallet_address,
            };
        },
        logout: async () => {
            const response = await axiosInstance.post('/api/v1/users/logout');
            return response.data;
        },
        registerForCompetition: async (walletAddress: string, competitionId: number) => {
            const response = await axiosInstance.post(`/api/v1/users/${walletAddress}/${competitionId}/register`);
            return response.data;
        }
    },
    hosts: {
        register: async (data: { email: string, organization: string, contactName: string }) => {
            const response = await axiosInstance.post('/api/v1/hosts/register', {
                email: data.email,
                organization: data.organization,
                contact_name: data.contactName
            });
            return response.data;
        },
        login: async (data: { email: string, organization: string, contactName: string }) => {
            const response = await axiosInstance.post('/api/v1/hosts/login', {
                email: data.email,
                organization: data.organization,
                contact_name: data.contactName
            });
            return response.data;
        },
        getProfile: async () => {
            const response = await axiosInstance.get('/api/v1/hosts/profile');
            return {
                ...response.data,
                ContactName: response.data.contact_name,
            };
        },
        getHostedCompetitions: async () => {
            const response = await axiosInstance.get('/api/v1/hosts/competitions');
            return response.data;
        },
        createCompetition: async (hostId: number, data: FormData) => {
            const response = await axiosFileInstance.post(
                `/api/v1/hosts/${hostId}/create-competition`,
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                }
            );
            return response.data;
        }
    },
    competitions: {
        getAll: async () => {
            const response = await axiosInstance.get('/api/v1/competitions/');
            return response.data;
        },
        getOne: async (id: number) => {
            const response = await axiosInstance.get(`/api/v1/competitions/${id}`);
            return response.data;
        },
        getLeaderboard: async (id: number) => {
            const response = await axiosInstance.get(`/api/v1/competitions/${id}/leaderboard`);
            return response.data;
        },
        getDatasetDownloadUrl: async (id: number) => {
            const response = await axiosInstance.get(`/api/v1/competitions/${id}/dataset-download-url`);
            return {
                ...response.data,
                downloadUrl: response.data.download_url,
            };
        }
    }
};