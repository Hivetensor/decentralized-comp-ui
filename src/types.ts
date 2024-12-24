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
    timeline: Array<{
      date: string;
      event: string;
    }>;
  }
  
  export interface LeaderboardEntry {
    rank: number;
    team: string;
    score: number;
    submissions: number;
    performance: number[];
  }
  
  export interface UserProfile {
    username: string;
    publicKey: string;
    joinDate: string;
    stats: {
      totalCompetitions: number;
      bestRank: number;
      totalSubmissions: number;
      averageScore: number;
    };
    recentCompetitions: Array<{
      id: string;
      name: string;
      rank: number;
      score: number;
      totalParticipants: number;
      date: string;
    }>;
  }