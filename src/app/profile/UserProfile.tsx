'use client';

import React from 'react';
import {useParams} from 'next/navigation';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Clock, Trophy} from 'lucide-react';
import {Alert, AlertDescription} from "@/components/ui/alert";
import {useUser} from '@/contexts/UserContext';
import Link from 'next/link';

const UserProfile = () => {
    const params = useParams();
    const {user} = useUser();

    if (!user || user.walletAddress !== params.walletAddress) {
        return (
            <div className="min-h-screen bg-black text-white p-8">
                <Alert variant="destructive" className="bg-red-900/20 border-red-900">
                    <AlertDescription>
                        Profile not found or you don't have access to view it.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-6">
                        <div
                            className="w-24 h-24 rounded-full bg-gradient-to-r from-purple-500 to-cyan-500 flex items-center justify-center text-3xl font-bold">
                            {user.username[0].toUpperCase()}
                        </div>
                        <div>
                            <h1 className="text-4xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                {user.username}
                            </h1>
                            <div className="flex items-center gap-4 text-gray-300">
                                <code className="bg-gray-800 px-3 py-1 rounded">{user.walletAddress}</code>
                                <span>Member since {new Date(user.joinedAt).toLocaleDateString()}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6 space-y-6">
                {/* Stats */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle
                            className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                            Competition Stats
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="flex items-center gap-3">
                                <Trophy className="w-8 h-8 text-yellow-500"/>
                                <div>
                                    <p className="text-sm text-gray-400">Total Competitions</p>
                                    <p className="text-2xl font-bold text-yellow-500">{user.competitions.length}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3">
                                <Badge
                                    className="h-8 w-8 flex items-center justify-center text-purple-500 bg-purple-900/20">
                                    #
                                </Badge>
                                <div>
                                    <p className="text-sm text-gray-400">Active Competitions</p>
                                    <p className="text-2xl font-bold text-purple-500">
                                        {user.competitions.filter(c => c.status === 'active').length}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Competitions List */}
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle
                            className="text-xl text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                            Your Competitions
                        </CardTitle>
                    </CardHeader>
                    <CardContent>
                        {user.competitions.length === 0 ? (
                            <div className="text-center py-8 text-gray-400">
                                You haven't joined any competitions yet.
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {user.competitions.map((competition) => (
                                    <Link
                                        key={competition.id}
                                        href={`/competitions/${competition.id}`}
                                        className="block"
                                    >
                                        <div
                                            className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-purple-500/50 transition-all duration-300">
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <h3 className="text-lg font-semibold text-gray-200">
                                                        {competition.title}
                                                    </h3>
                                                    <div className="flex items-center gap-4 mt-2">
                                                        <Badge className={competition.status === 'active'
                                                            ? 'bg-green-900/20 text-green-400 border-green-500/20'
                                                            : 'bg-gray-800 text-gray-300'
                                                        }>
                                                            {competition.status}
                                                        </Badge>
                                                        <div className="flex items-center gap-1 text-gray-400">
                                                            <Clock className="w-4 h-4"/>
                                                            Joined {new Date(competition.joinedAt).toLocaleDateString()}
                                                        </div>
                                                    </div>
                                                </div>
                                                {/*{competition.rank && (*/}
                                                {/*    <div className="text-right">*/}
                                                {/*        <div className="text-xl font-bold text-purple-400">*/}
                                                {/*            #{competition.rank}*/}
                                                {/*        </div>*/}
                                                {/*        <div className="text-sm text-gray-400">*/}
                                                {/*            Current Rank*/}
                                                {/*        </div>*/}
                                                {/*    </div>*/}
                                                {/*)}*/}
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