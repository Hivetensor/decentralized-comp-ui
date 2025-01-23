'use client';

import React, {useState} from 'react';
import {useParams} from 'next/navigation';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Loader2, Play, Timer, Trophy, Users} from 'lucide-react';
import {Alert, AlertDescription} from "@/components/ui/alert";
import {useCompetitionDetail} from '@/hooks/useCompetition';
import LeaderboardComponent from './LeaderboardComponent';
import {UserRegistrationModal} from '@/components/UserRegistrationModal';
import {useUser} from '@/contexts/UserContext';

const CompetitionDetail = () => {
    const params = useParams();
    const competitionId = Number(params.id);
    const {competition, leaderboard, loading, error} = useCompetitionDetail(competitionId);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const {user, registerUser, joinCompetition, isInCompetition} = useUser();

    const handleJoinClick = () => {
        setShowRegistrationModal(true);
    };

    const handleRegistrationSubmit = async (data: { username: string; walletAddress: string }) => {
        try {
            registerUser(data.username, data.walletAddress);
            joinCompetition(competitionId);
            setShowRegistrationModal(false);
        } catch (error) {
            console.error('Registration failed:', error);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
                <Loader2 className="h-8 w-8 animate-spin text-purple-500"/>
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-8">
                <Alert variant="destructive" className="bg-red-900/20 border-red-900">
                    <AlertDescription>
                        Failed to load competition details. Please try again later.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    if (!competition) return null;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black">
            {/* Hero Header */}
            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 py-12 px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                        <div className="flex-1 space-y-6">
                            <div className="flex flex-wrap gap-2">
                                {competition.tags.map((tag) => (
                                    <Badge key={tag} className="bg-gray-800/80 text-gray-100">
                                        {tag}
                                    </Badge>
                                ))}
                            </div>
                            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                {competition.title}
                            </h1>
                            <p className="text-lg text-gray-200 leading-relaxed">
                                {competition.description}
                            </p>
                        </div>

                        <div className="w-full md:w-auto">
                            {!isInCompetition(competitionId) ? (
                                <button
                                    className="w-full md:w-auto px-10 py-4 text-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-md text-white font-medium shadow-lg hover:shadow-xl transition-all"
                                    onClick={handleJoinClick}
                                >
                                    Join Competition
                                </button>
                            ) : (
                                <div
                                    className="text-green-400 font-medium bg-green-900/20 px-6 py-3 rounded-md border border-green-500/20">
                                    Already Joined
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Competition Stats */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card className="bg-gray-800/50 border-gray-700">
                        <CardContent className="p-6 flex items-center gap-4">
                            <Trophy className="h-8 w-8 text-yellow-500"/>
                            <div>
                                <p className="text-sm text-gray-400">Prize Pool</p>
                                <p className="text-xl font-bold text-yellow-400">{competition.prize}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800/50 border-gray-700">
                        <CardContent className="p-6 flex items-center gap-4">
                            <Users className="h-8 w-8 text-blue-400"/>
                            <div>
                                <p className="text-sm text-gray-400">Participants</p>
                                <p className="text-xl font-bold text-blue-400">{competition.participants}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800/50 border-gray-700">
                        <CardContent className="p-6 flex items-center gap-4">
                            <Play className="h-8 w-8 text-purple-400"/>
                            <div>
                                <p className="text-sm text-gray-400">Start Date</p>
                                <p className="text-xl font-bold text-purple-400">{competition.start_date}</p>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-800/50 border-gray-700">
                        <CardContent className="p-6 flex items-center gap-4">
                            <Timer className="h-8 w-8 text-cyan-400"/>
                            <div>
                                <p className="text-sm text-gray-400">Time Remaining</p>
                                <p className="text-xl font-bold text-cyan-400">{competition.deadline}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs Section */}
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="bg-gray-800/50 border-gray-700">
                        <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600/80 text-gray-200">
                            Overview
                        </TabsTrigger>
                        <TabsTrigger value="rules" className="data-[state=active]:bg-purple-600/80 text-gray-200">
                            Rules
                        </TabsTrigger>
                        <TabsTrigger value="leaderboard" className="data-[state=active]:bg-purple-600/80 text-gray-200">
                            Leaderboard
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6">
                        <Card className="bg-gray-800/50 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-2xl text-gray-100">Competition Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-200 leading-relaxed">{competition.description}</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="rules" className="mt-6">
                        <Card className="bg-gray-800/50 border-gray-700">
                            <CardHeader>
                                <CardTitle className="text-2xl text-gray-100">Competition Rules</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    {competition.rules.map((rule, index) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <div className="w-2 h-2 mt-2 bg-purple-500 rounded-full flex-shrink-0"/>
                                            <span className="text-gray-200">{rule}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="leaderboard" className="mt-6">
                        <LeaderboardComponent leaderboardData={leaderboard}/>
                    </TabsContent>
                </Tabs>
            </div>

            <UserRegistrationModal
                isOpen={showRegistrationModal}
                onClose={() => setShowRegistrationModal(false)}
                onSubmit={handleRegistrationSubmit}
            />
        </div>
    );
};

export default CompetitionDetail;