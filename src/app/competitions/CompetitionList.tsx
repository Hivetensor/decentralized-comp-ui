'use client';

import React, { useEffect, useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Loader2, Play, Search, Timer, Trophy, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import { api } from '@/services/api';
import { Competition } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';

const CompetitionList = () => {
    const router = useRouter();
    const { user } = useAuth();
    const [searchQuery, setSearchQuery] = useState('');
    const [difficultyFilter, setDifficultyFilter] = useState<string>('all');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [sortBy, setSortBy] = useState<string>('deadline');

    const [competitions, setCompetitions] = useState<Competition[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCompetitions = async () => {
            try {
                setLoading(true);
                setError(null);
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

    const isUserInCompetition = (competitionId: number) => {
        if (!user || user.type !== 'competitor') return false;
        return user.data.competitions?.some(comp => comp.id === competitionId);
    };

    const filteredCompetitions = competitions
        .filter(comp => {
            if (searchQuery) {
                const search = searchQuery.toLowerCase();
                return comp.title.toLowerCase().includes(search) ||
                    comp.description.toLowerCase().includes(search);
            }
            return true;
        })
        .filter(comp => {
            if (difficultyFilter !== 'all') {
                return comp.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
            }
            return true;
        })
        .filter(comp => {
            if (statusFilter !== 'all') {
                return comp.status.toLowerCase() === statusFilter.toLowerCase();
            }
            return true;
        })
        .sort((a, b) => {
            switch (sortBy) {
                case 'prize':
                    return parseInt(b.prize) - parseInt(a.prize);
                case 'deadline':
                    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
                case 'participants':
                    return b.participants - a.participants;
                default:
                    return 0;
            }
        });

    return (
        <div className="min-h-screen bg-black text-white">
            {/* Header section remains the same */}

            {/* Filters section remains the same */}

            {/* Competition Cards */}
            {!loading && !error && (
                <div className="grid grid-cols-1 gap-6">
                    {filteredCompetitions.map((competition) => (
                        <Card
                            key={competition.id}
                            className="bg-gray-900 border-gray-800 hover:border-purple-500 transition-all duration-300"
                        >
                            <CardContent className="p-6">
                                <div className="flex flex-col md:flex-row justify-between">
                                    <div className="flex-1">
                                        <Link href={`/competitions/${competition.id}`}>
                                            <h3 className="text-2xl font-bold mb-2 text-white">{competition.title}</h3>
                                        </Link>
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
                                            onClick={() => router.push(`/competitions/${competition.id}`)}
                                            className="mt-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                                        >
                                            {isUserInCompetition(competition.id)
                                                ? 'View Details'
                                                : 'Join Competition'}
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
};

export default CompetitionList;