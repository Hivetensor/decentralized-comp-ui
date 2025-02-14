'use client';

import React, {useEffect, useState} from 'react';
import {Card, CardContent} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from '@/components/ui/button';
import {Play, Timer, Trophy, Users, Zap, Frown} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {api} from '@/services/api';
import {Competition} from '@/types';
import {useAuth} from '@/contexts/AuthContext';
import Link from "next/link";

const CompetitionList = () => {
    const router = useRouter();
    const {user} = useAuth();
    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                setLoading(true);
                const response = await api.competitions.getAll();
                setCompetitions(response);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch competitions');
            } finally {
                setLoading(false);
            }
        };

        fetchCompetitions();
    }, []);

    const handleJoinClick = (competitionId: number) => {
        router.push(`/competitions/${competitionId}`);
    };

    if (loading) {
        return <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"/>
        </div>;
    }

    if (competitions.length === 0) {
        return (
            <div className="min-h-screen bg-black text-white">
                <div className="max-w-7xl mx-auto p-6">
                    <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
                        <div className="bg-gray-900/50 border border-gray-800 rounded-2xl p-8 max-w-lg">
                            <Frown className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h2 className="text-2xl font-bold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                No Competitions Yet
                            </h2>
                            <p className="text-gray-400 mb-6">
                                There are no active competitions at the moment. Please check back soon for exciting new challenges!
                            </p>
                            <div className="border-t border-gray-800 pt-6">
                                <p className="text-sm text-gray-500">
                                    Want to host a competition?
                                    <Link href="/host" className="text-purple-400 hover:text-purple-300 ml-1">
                                        Click here to get started
                                    </Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    if (error) {
        return <div className="text-center text-red-500 p-4">{error}</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="max-w-7xl mx-auto p-6 space-y-6">
                {competitions.map((competition) => (
                    <Card key={competition.id}
                          className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-all duration-300">
                        <CardContent className="p-6">
                            <div className="flex flex-col md:flex-row justify-between">
                                <div className="flex-1">
                                    <h3 className="text-2xl font-bold mb-2 text-white">{competition.title}</h3>
                                    <p className="text-gray-400 mb-4">{competition.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {competition.tags.map((tag) => (
                                            <Badge key={tag} variant="secondary" className="bg-gray-800 text-gray-300">
                                                {tag}
                                            </Badge>
                                        ))}
                                    </div>
                                </div>
                                <div className="flex flex-col justify-between md:ml-8 space-y-4">
                                    <div className="flex items-center gap-2">
                                        <Trophy className="w-5 h-5 text-yellow-500"/>
                                        <span className="text-yellow-500 font-bold">{competition.prize}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Users className="w-5 h-5 text-blue-400"/>
                                        <span className="text-gray-400">{competition.participants} participants</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Play className="w-5 h-5 text-yellow-400"/>
                                        <span className="text-gray-400">{competition.start_date}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Timer className="w-5 h-5 text-red-400"/>
                                        <span className="text-gray-400">{competition.deadline}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <Zap className="w-5 h-5 text-green-400"/>
                                        <span className="text-gray-400">{competition.difficulty}</span>
                                    </div>
                                    <Button
                                        onClick={() => handleJoinClick(competition.id)}
                                        className="mt-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                                    >
                                        View Details
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default CompetitionList;