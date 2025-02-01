export interface Competition {
    id: number;
    title: string;
    description: string;
    prize: string;
    participants: number;
    start_date: string;
    deadline: string;
    difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
    status: 'Active' | 'Upcoming' | 'Completed';
    tags: string[];
    rules: string[];
}

export interface LeaderboardEntry {
    rank: number;
    team_name: string;
    score: number;
    scores: number[];
    submission_date: number;
}

export interface UserProfile {
    username: string;
    walletAddress: string;
    joinedAt: string;
    competitions: {
        id: number;
        title: string;
        rank?: number;
        status: 'active' | 'completed';
        joinedAt: string;
    }[];
}

// types/api.ts
export interface ApiResponse<T> {
    message: string;
    data?: T;
    error?: string;
}

export interface UserResponse {
    username: string;
    walletAddress: string;
    joinedAt: string;
    competitions?: any[];
}

export interface HostResponse {
    email: string;
    organization: string;
    contactName: string;
    status: string;
    createdAt: string;
}

export interface CompetitionResponse {
    id: number;
    title: string;
    description: string;
    prize: string;
    participants: number;
    start_date: string;
    deadline: string;
    difficulty: string;
    status: string;
    tags: string[];
    rules: string[];
}