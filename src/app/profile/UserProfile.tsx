'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Award, GitBranch, Clock, Users } from 'lucide-react';

// Types
interface Competition {
  id: string;
  name: string;
  rank: number;
  score: number;
  totalParticipants: number;
  date: string;
}

interface UserStats {
  totalCompetitions: number;
  bestRank: number;
  totalSubmissions: number;
  averageScore: number;
}

// Sample data
const userData = {
  username: "generalElephant",
  publicKey: "0x1234...5678",
  joinDate: "2024-01-15",
  stats: {
    totalCompetitions: 12,
    bestRank: 1,
    totalSubmissions: 156,
    averageScore: 0.92,
  },
  recentCompetitions: [
    {
      id: "1",
      name: "Neural Network Challenge 2024",
      rank: 1,
      score: 0.945,
      totalParticipants: 234,
      date: "2024-12-01"
    },
    {
      id: "2",
      name: "Quantum Computing Optimization",
      rank: 3,
      score: 0.912,
      totalParticipants: 189,
      date: "2024-11-15"
    },
    {
      id: "3",
      name: "Blockchain Data Analysis",
      rank: 2,
      score: 0.923,
      totalParticipants: 167,
      date: "2024-10-30"
    }
  ]
};

const UserProfile = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-6">
            <div className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-3xl font-bold">
              {userData.username[0].toUpperCase()}
            </div>
            <div>
              <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                {userData.username}
              </h1>
              <div className="flex items-center gap-4 text-gray-300">
                <code className="bg-gray-800 px-3 py-1 rounded">{userData.publicKey}</code>
                <span>Member since {new Date(userData.joinDate).toLocaleDateString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 flex items-center gap-3">
              <Trophy className="w-8 h-8 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-400">Competitions</p>
                <p className="text-2xl font-bold text-yellow-500">{userData.stats.totalCompetitions}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 flex items-center gap-3">
              <Star className="w-8 h-8 text-purple-500" />
              <div>
                <p className="text-sm text-gray-400">Best Rank</p>
                <p className="text-2xl font-bold text-purple-500">#{userData.stats.bestRank}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 flex items-center gap-3">
              <GitBranch className="w-8 h-8 text-cyan-500" />
              <div>
                <p className="text-sm text-gray-400">Submissions</p>
                <p className="text-2xl font-bold text-cyan-500">{userData.stats.totalSubmissions}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 flex items-center gap-3">
              <Award className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-sm text-gray-400">Avg Score</p>
                <p className="text-2xl font-bold text-green-500">{userData.stats.averageScore}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Recent Competitions */}
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
              Recent Competitions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {userData.recentCompetitions.map((competition) => (
                <div 
                  key={competition.id}
                  className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-purple-500 transition-all duration-300"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <Badge variant="outline" className="bg-purple-900/20">
                        #{competition.rank}
                      </Badge>
                      <div>
                        <h3 className="text-lg font-semibold text-white">
                          {competition.name}
                        </h3>
                        <div className="flex items-center gap-4 mt-1 text-sm text-gray-400">
                          <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            {competition.totalParticipants} participants
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {new Date(competition.date).toLocaleDateString()}
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xl font-bold text-cyan-400">
                        {competition.score.toFixed(3)}
                      </div>
                      <div className="text-sm text-gray-400">
                        Score
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default UserProfile;