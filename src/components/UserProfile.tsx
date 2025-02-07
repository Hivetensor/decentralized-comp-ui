'use client';

import React, {useEffect} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Award, GitBranch, Trophy} from 'lucide-react';
import Link from 'next/link';
import {useAuth} from '@/contexts/AuthContext';

const UserProfile = () => {
    const params = useParams();
    const router = useRouter();
    const {user} = useAuth();

    useEffect(() => {
        if (!user || user.type !== 'competitor' || user.data.walletAddress !== params.walletAddress) {
            router.push('/');
        }
    }, [user, params.walletAddress, router]);

    if (!user || user.type !== 'competitor' || user.data.walletAddress !== params.walletAddress) {
        return null;
    }

    if (!user || user.type !== 'competitor' || user.data.walletAddress !== params.walletAddress) {
        router.push('/');
        return null;
    }

    const competitions = user.data.competitions || [];

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-6">
                        <div
                            className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-2xl font-bold">
                            {user.data.username[0].toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                {user.data.username}
                            </h1>
                            <div className="flex items-center gap-4 text-gray-300">
                                <code className="bg-gray-800 px-3 py-1 rounded text-sm">
                                    {user.data.walletAddress.slice(0, 6)}...{user.data.walletAddress.slice(-4)}
                                </code>
                                <span>Member since {new Date(user.data.joinedAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6 space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card className="bg-gray-800/50 border-gray-700">
                        <CardContent className="p-6 flex items-center gap-4">
                            <Trophy className="h-8 w-8 text-yellow-500"/>
                            <div>
                                <p className="text-sm text-gray-400">Active Competitions</p>
                                <p className="text-2xl font-bold text-yellow-400">
                                    {competitions.filter(c => c.status === 'active').length}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800/50 border-gray-700">
                        <CardContent className="p-6 flex items-center gap-4">
                            <GitBranch className="h-8 w-8 text-cyan-500"/>
                            <div>
                                <p className="text-sm text-gray-400">Completed</p>
                                <p className="text-2xl font-bold text-cyan-400">
                                    {competitions.filter(c => c.status === 'completed').length}
                                </p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800/50 border-gray-700">
                        <CardContent className="p-6 flex items-center gap-4">
                            <Award className="h-8 w-8 text-green-500"/>
                            <div>
                                <p className="text-sm text-gray-400">Total Competitions</p>
                                <p className="text-2xl font-bold text-green-400">{competitions.length}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                        <CardTitle
                            className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                            Competition History
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {competitions.length === 0 ? (
                            <div className="text-center py-8 text-gray-400">
                                No competitions yet
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {competitions.map((competition) => (
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
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default UserProfile;