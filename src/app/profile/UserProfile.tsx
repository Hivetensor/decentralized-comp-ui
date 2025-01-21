'use client';

import React from 'react';
import {useParams} from 'next/navigation';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Award, Clock, GitBranch, Loader2, Star, Trophy, Users} from 'lucide-react';
import {Alert, AlertDescription} from "@/components/ui/alert";
import {useProfile} from '@/hooks/useProfile';

const UserProfile = () => {
    const params = useParams();
    const username = String(params.username);
    const {profile, loading, error} = useProfile(username);

    if (loading) {
        return (
            <div className="min-h-screen bg-black text-white flex items-center justify-center">
                <Loader2 className="h-8 w-8 animate-spin text-purple-500"/>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black text-white p-8">
                <Alert variant="destructive" className="bg-red-900/20 border-red-900">
                    <AlertDescription>
                        Failed to load user profile. Please try again later.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    if (!profile) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-6">
                        <div
                            className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-3xl font-bold">
                            {profile.username[0].toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                {profile.username}
                            </h1>
                            <div className="flex items-center gap-4 text-gray-300">
                                <code className="bg-gray-800 px-3 py-1 rounded">{profile.publicKey}</code>
                                <span>Member since {new Date(profile.joinDate).toLocaleDateString()}</span>
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
                            <Trophy className="w-8 h-8 text-yellow-500"/>
                            <div>
                                <p className="text-sm text-gray-400">Competitions</p>
                                <p className="text-2xl font-bold text-yellow-500">{profile.stats.totalCompetitions}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="p-4 flex items-center gap-3">
                            <Star className="w-8 h-8 text-purple-500"/>
                            <div>
                                <p className="text-sm text-gray-400">Best Rank</p>
                                <p className="text-2xl font-bold text-purple-500">#{profile.stats.bestRank}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="p-4 flex items-center gap-3">
                            <GitBranch className="w-8 h-8 text-cyan-500"/>
                            <div>
                                <p className="text-sm text-gray-400">Submissions</p>
                                <p className="text-2xl font-bold text-cyan-500">{profile.stats.totalSubmissions}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="p-4 flex items-center gap-3">
                            <Award className="w-8 h-8 text-green-500"/>
                            <div>
                                <p className="text-sm text-gray-400">Avg Score</p>
                                <p className="text-2xl font-bold text-green-500">{profile.stats.averageScore}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Competitions */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle
                            className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                            Recent Competitions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {profile.recentCompetitions.map((competition) => (
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
                                                        <Users className="w-4 h-4"/>
                                                        {competition.totalParticipants} participants
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        <Clock className="w-4 h-4"/>
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