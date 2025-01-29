// CompetitionList.tsx
'use client';
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Loader2, Play, Search, Timer, Trophy, Users, Zap } from 'lucide-react';
import Link from 'next/link';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { api } from '@/services/api';
import { Competition } from '@/types';

const CompetitionList = () => {
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
    }, []); // Empty dependency array means this runs once on mount

    const filteredCompetitions = competitions
        .filter(comp => {
            // Search filter
            if (searchQuery) {
                const search = searchQuery.toLowerCase();
                return comp.title.toLowerCase().includes(search) ||
                    comp.description.toLowerCase().includes(search);
            }
            return true;
        })
        .filter(comp => {
            // Difficulty filter
            if (difficultyFilter !== 'all') {
                return comp.difficulty.toLowerCase() === difficultyFilter.toLowerCase();
            }
            return true;
        })
        .filter(comp => {
            // Status filter
            if (statusFilter !== 'all') {
                return comp.status.toLowerCase() === statusFilter.toLowerCase();
            }
            return true;
        })
        .sort((a, b) => {
            // Sorting
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
            {/* Header */}
            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Active Competitions
                    </h1>
                    <p className="text-gray-300">Discover and join cutting-edge data science challenges</p>
                </div>
            </div>

            {/* Filters */}
            <div className="max-w-7xl mx-auto p-6">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                    <div className="relative">
                        <Search className="absolute left-3 top-3 h-4 w-4 text-gray-500"/>
                        <Input
                            placeholder="Search competitions..."
                            className="pl-10 bg-gray-900 border-gray-800 text-white"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <Select value={difficultyFilter} onValueChange={setDifficultyFilter}>
                        <SelectTrigger className="bg-gray-900 border-gray-800 text-white">
                            <SelectValue placeholder="Difficulty"/>
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-800 text-white">
                            <SelectItem value="all">All Difficulties</SelectItem>
                            <SelectItem value="beginner">Beginner</SelectItem>
                            <SelectItem value="intermediate">Intermediate</SelectItem>
                            <SelectItem value="advanced">Advanced</SelectItem>
                            <SelectItem value="expert">Expert</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="bg-gray-900 border-gray-800 text-white">
                            <SelectValue placeholder="Status"/>
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-800 text-white">
                            <SelectItem value="all">All Status</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>

                    <Select value={sortBy} onValueChange={setSortBy}>
                        <SelectTrigger className="bg-gray-900 border-gray-800 text-white">
                            <SelectValue placeholder="Sort By"/>
                        </SelectTrigger>
                        <SelectContent className="bg-gray-900 border-gray-800 text-white">
                            <SelectItem value="prize">Prize Amount</SelectItem>
                            <SelectItem value="deadline">Deadline</SelectItem>
                            <SelectItem value="participants">Participants</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Error State */}
                {error && (
                    <Alert variant="destructive" className="mb-6 bg-red-900/20 border-red-900">
                        <AlertDescription>{error}</AlertDescription>
                    </Alert>
                )}

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-12">
                        <Loader2 className="h-8 w-8 animate-spin text-purple-500"/>
                    </div>
                )}

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
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default CompetitionList;