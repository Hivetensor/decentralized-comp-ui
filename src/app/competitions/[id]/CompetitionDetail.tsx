'use client';

import React from 'react';
import {useParams} from 'next/navigation';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Loader2, Play, Timer, Trophy, Users} from 'lucide-react';
import {Alert, AlertDescription} from "@/components/ui/alert";
import {useCompetitionDetail} from '@/hooks/useCompetition';
import LeaderboardComponent from './LeaderboardComponent';

const CompetitionDetail = () => {
    const params = useParams();
    const competitionId = Number(params.id);
    const {competition, leaderboard, loading, error} = useCompetitionDetail(competitionId);

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
                        Failed to load competition details. Please try again later.
                    </AlertDescription>
                </Alert>
            </div>
        );
    }

    if (!competition) {
        return null;
    }

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-8">
                <div className="max-w-7xl mx-auto">
                    <div className="flex items-center gap-4 mb-4">
                        {competition.tags.map((tag) => (
                            <Badge key={tag} className="bg-gray-800 text-gray-300">
                                {tag}
                            </Badge>
                        ))}
                    </div>
                    <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        {competition.title}
                    </h1>
                    <p className="text-gray-300 max-w-3xl">{competition.description}</p>
                </div>
            </div>

            {/* Competition Info */}
            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="p-4 flex items-center gap-3">
                            <Trophy className="w-6 h-6 text-yellow-500"/>
                            <div>
                                <p className="text-sm text-gray-400">Prize Pool</p>
                                <p className="text-lg font-bold text-yellow-500">{competition.prize}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="p-4 flex items-center gap-3">
                            <Users className="w-6 h-6 text-blue-400"/>
                            <div>
                                <p className="text-sm text-gray-400">Participants</p>
                                <p className="text-lg font-bold text-blue-400">{competition.participants}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="p-4 flex items-center gap-3">
                            <Play className="w-6 h-6 text-red-400"/>
                            <div>
                                <p className="text-sm text-gray-400">Start Date</p>
                                <p className="text-lg font-bold text-red-400">{competition.start_date}</p>
                            </div>
                        </CardContent>
                    </Card>
                    <Card className="bg-gray-900 border-gray-800">
                        <CardContent className="p-4 flex items-center gap-3">
                            <Timer className="w-6 h-6 text-red-400"/>
                            <div>
                                <p className="text-sm text-gray-400">Time Remaining</p>
                                <p className="text-lg font-bold text-red-400">{competition.deadline}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Tabs Section */}
                <Tabs defaultValue="overview" className="w-full">
                    <TabsList className="bg-gray-900 border-gray-800">
                        <TabsTrigger value="overview"
                                     className="data-[state=active]:bg-purple-600">Overview</TabsTrigger>
                        <TabsTrigger value="rules" className="data-[state=active]:bg-purple-600">Rules</TabsTrigger>
                        {/* <TabsTrigger value="timeline" className="data-[state=active]:bg-purple-600">Timeline</TabsTrigger> */}
                        <TabsTrigger value="leaderboard"
                                     className="data-[state=active]:bg-purple-600">Leaderboard</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="mt-6">
                        <Card className="bg-gray-900 border-gray-800">
                            <CardHeader>
                                <CardTitle>Competition Overview</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-gray-300">{competition.description}</p>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="rules" className="mt-6">
                        <Card className="bg-gray-900 border-gray-800">
                            <CardHeader>
                                <CardTitle>Competition Rules</CardTitle>
                            </CardHeader>
                            <CardContent>
                                <ul className="space-y-4">
                                    {competition.rules.map((rule, index) => (
                                        <li key={index} className="flex items-center gap-2">
                                            <div className="w-2 h-2 bg-purple-500 rounded-full"/>
                                            <span className="text-gray-300">{rule}</span>
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* <TabsContent value="timeline" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Competition Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {competition.timeline.map((event, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-gray-300">{event.event}</p>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent> */}

                    <TabsContent value="leaderboard" className="mt-6">
                        <LeaderboardComponent leaderboardData={leaderboard}/>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default CompetitionDetail;

