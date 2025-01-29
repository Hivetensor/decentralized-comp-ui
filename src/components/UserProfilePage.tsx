'use client';

import React from 'react';
import {useParams} from 'next/navigation';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Award, GitBranch, Star, Trophy} from 'lucide-react';
import Link from 'next/link';
import {useUser} from '@/contexts/UserContext';

const UserProfilePage = () => {
    const params = useParams();
    const walletAddress = String(params.walletAddress);
    const {user} = useUser();

    if (!user || user.walletAddress !== walletAddress) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8">
                <div className="max-w-7xl mx-auto text-center">
                    <h1 className="text-2xl font-bold text-gray-200">Profile Not Found</h1>
                    <p className="text-gray-400 mt-2">This profile doesn't exist or you don't have access to view
                        it.</p>
                </div>
            </div>
        );
    }

    // Calculate stats
    const activeCompetitions = user.competitions.filter(c => c.status === 'active').length;
    const completedCompetitions = user.competitions.filter(c => c.status === 'completed').length;
    const bestRank = user.competitions.reduce((best, curr) =>
        curr.rank ? Math.min(best, curr.rank) : best, Infinity);

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
            {/* Profile Header */}
            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-6">
                        <div
                            className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-2xl font-bold">
                            {user.username[0].toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                {user.username}
                            </h1>
                            <div className="flex items-center gap-4 text-gray-300">
                                <code className="bg-gray-800 px-3 py-1 rounded text-sm">
                                    {walletAddress.slice(0, 6)}...{walletAddress.slice(-4)}
                                </code>
                                <span>Member since {new Date(user.joinedAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6 space-y-8">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <Card className="bg-gray-800/50 border-gray-700">
                        <CardContent className="p-6 flex items-center gap-4">
                            <Trophy className="h-8 w-8 text-yellow-500"/>
                            <div>
                                <p className="text-sm text-gray-400">Active Competitions</p>
                                <p className="text-2xl font-bold text-yellow-400">{activeCompetitions}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800/50 border-gray-700">
                        <CardContent className="p-6 flex items-center gap-4">
                            <Star className="h-8 w-8 text-purple-500"/>
                            <div>
                                <p className="text-sm text-gray-400">Best Rank</p>
                                <p className="text-2xl font-bold text-purple-400">
                                    {bestRank === Infinity ? '-' : `#${bestRank}`}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800/50 border-gray-700">
                        <CardContent className="p-6 flex items-center gap-4">
                            <GitBranch className="h-8 w-8 text-cyan-500"/>
                            <div>
                                <p className="text-sm text-gray-400">Completed</p>
                                <p className="text-2xl font-bold text-cyan-400">{completedCompetitions}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800/50 border-gray-700">
                        <CardContent className="p-6 flex items-center gap-4">
                            <Award className="h-8 w-8 text-green-500"/>
                            <div>
                                <p className="text-sm text-gray-400">Total Competitions</p>
                                <p className="text-2xl font-bold text-green-400">{user.competitions.length}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Competitions List */}
                <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                        <CardTitle
                            className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                            Competition History
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {user.competitions.map((competition) => (
                                <Link
                                    key={competition.id}
                                    href={`/competitions/${competition.id}`}
                                    className="block"
                                >
                                    <div
                                        className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <h3 className="text-lg font-semibold text-gray-200">
                                                    {competition.title}
                                                </h3>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <Badge
                                                        className={
                                                            competition.status === 'active'
                                                                ? 'bg-green-900/20 text-green-400 border-green-500/20'
                                                                : 'bg-gray-800 text-gray-300'
                                                        }
                                                    >
                                                        {competition.status}
                                                    </Badge>
                                                    <span className="text-sm text-gray-400">
                                                        Joined {new Date(competition.joinedAt).toLocaleDateString()}
                                                    </span>
                                                </div>
                                            </div>
                                            {competition.rank && (
                                                <div className="text-right">
                                                    <div className="text-xl font-bold text-purple-400">
                                                        #{competition.rank}
                                                    </div>
                                                    <div className="text-sm text-gray-400">
                                                        Current Rank
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UserProfilePage;