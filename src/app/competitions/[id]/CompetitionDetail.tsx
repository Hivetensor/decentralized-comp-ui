'use client';

import React, {useEffect, useState} from 'react';
import {useParams, useRouter} from 'next/navigation';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Copy, ExternalLink, Loader2, Play, Timer, Trophy, Upload, Users} from 'lucide-react';
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Button} from "@/components/ui/button";
import {UserRegistrationModal} from '@/components/UserRegistrationModal';
import {useAuth} from '@/contexts/AuthContext';
import {api} from '@/services/api';
import {toast} from '@/hooks/use-toast';
import LeaderboardComponent from './LeaderboardComponent';
import {Competition, LeaderboardEntry} from '@/types';
import {Input} from "@/components/ui/input";

const CompetitionDetail = () => {
    const params = useParams();
    const competitionId = Number(params.id);
    const {user} = useAuth();
    const router = useRouter();

    const [competition, setCompetition] = useState<Competition | null>(null);
    const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showRegistrationModal, setShowRegistrationModal] = useState(false);
    const [submissionUrl, setSubmissionUrl] = useState('');

    useEffect(() => {
        const fetchCompetitionData = async () => {
            try {
                setLoading(true);
                setError(null);
                const [competitionData, leaderboardData] = await Promise.all([
                    api.competitions.getOne(competitionId),
                    api.competitions.getLeaderboard(competitionId)
                ]);
                setCompetition(competitionData);
                setLeaderboard(leaderboardData);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to fetch competition data');
            } finally {
                setLoading(false);
            }
        };

        fetchCompetitionData();
    }, [competitionId]);

    // Check if user is already in this competition
    const isUserInCompetition = user?.type === 'competitor' &&
        user.data.competitions?.some(comp => comp.id === competitionId);

    const handleJoinCompetition = async (walletAddress: string) => {
        try {
            await api.users.registerForCompetition(walletAddress, competitionId);
            toast({
                title: "Success",
                description: "You've successfully joined the competition!",
                variant: "success",
            });
            router.refresh();
            window.location.reload();
        } catch (error) {
            throw new Error(error instanceof Error ? error.message : "Failed to join competition");
        }
    };

    const handleRegistrationSubmit = async (data: { username: string; walletAddress: string }) => {
        try {
            // First register the user
            await api.users.register(data);

            // Then log them in
            await api.users.login(data);

            // Finally register them for the competition
            await handleJoinCompetition(data.walletAddress);

            setShowRegistrationModal(false);
            router.refresh();
        } catch (error) {
            toast({
                title: "Registration Failed",
                description: error instanceof Error ? error.message : "Please try again",
                variant: "destructive",
            });
        }
    };

    const handleJoinClick = async () => {
        if (!user) {
            toast({
                title: "Authentication Required",
                description: "Please register to join competitions",
                variant: "destructive",
            });
            setShowRegistrationModal(true);
            return;
        }

        if (user.type !== 'competitor') {
            toast({
                title: "Access Denied",
                description: "Only competitors can join competitions",
                variant: "destructive",
            });
            return;
        }

        if (user.type == 'competitor') {
            try {
                await handleJoinCompetition(user.data.walletAddress);

            } catch (error) {
                toast({
                    title: "Failed to join competition",
                    description: error instanceof Error ? error.message : "Please try again",
                    variant: "destructive",
                });
            }
        }
    };

    const handleDownloadClick = async () => {
        if (!user) {
            toast({
                title: "Authentication Required",
                description: "Please register or log in to download the dataset",
                variant: "destructive",
            });
            setShowRegistrationModal(true);
            return;
        }

        if (user.type !== 'competitor') {
            toast({
                title: "Access Denied",
                description: "Only competitors can download datasets",
                variant: "destructive",
            });
            return;
        }

        if (!isUserInCompetition) {
            toast({
                title: "Access Denied",
                description: "You must join the competition to download the dataset",
                variant: "destructive",
            });
            return;
        }

        try {
            const {downloadUrl} = await api.competitions.getDatasetDownloadUrl(competitionId);

            // Create temporary link and trigger download
            window.open(downloadUrl, '_blank');

            toast({
                title: "Download Started",
                description: "Your dataset download will begin shortly",
                variant: "success",
            });
        } catch (error) {
            toast({
                title: "Download Failed",
                description: error instanceof Error ? error.message : "Please try again",
                variant: "destructive",
            });
        }
    };


    const handleSubmitSolution = async () => {
        if (!submissionUrl) {
            toast({
                title: "Error",
                description: "Please enter a HuggingFace submission URL",
                variant: "destructive",
            });
            return;
        }

        try {
            await api.competitions.submit(competitionId, {
                url: submissionUrl
            });

            toast({
                title: "Success",
                description: "Your solution has been submitted",
                variant: "success",
            });

            router.refresh();
        } catch (error) {
            toast({
                title: "Submission Failed",
                description: error instanceof Error ? error.message : "Please try again",
                variant: "destructive",
            });
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black">
                <Loader2 className="h-8 w-8 animate-spin text-purple-500"/>
            </div>
        );
    }

    if (error || !competition) {
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

                            {/* Prize and Wallet Info */}
                            <div className="flex flex-wrap gap-6 items-center">
                                <div className="flex items-center gap-2">
                                    <Trophy className="h-6 w-6 text-yellow-500"/>
                                    <span className="text-xl font-bold text-yellow-400">
                                        {competition.prize} {competition.prize_currency}
                                    </span>
                                </div>

                                {competition.has_external_wallet && (
                                    <div className="flex-1 bg-gray-800/50 rounded-lg p-3">
                                        <div className="flex items-center justify-between gap-4">
                                            <div className="flex items-center gap-2">
                                                <ExternalLink className="h-5 w-5 text-purple-400"/>
                                                <span className="text-gray-300 text-sm">Support Pool:</span>
                                            </div>
                                            <code className="text-sm bg-gray-900/50 px-3 py-1 rounded text-gray-300">
                                                {competition.wallet_address}
                                            </code>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                onClick={() => {
                                                    navigator.clipboard.writeText(competition.wallet_address);
                                                    toast({
                                                        title: "Copied!",
                                                        description: "Wallet address copied to clipboard",
                                                        variant: "success",
                                                    });
                                                }}
                                            >
                                                <Copy className="h-4 w-4"/>
                                            </Button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>

                        <div className="w-full md:w-auto space-y-4">
                            {isUserInCompetition ? (
                                <div className="space-y-4">
                                    <div className="text-green-400 font-medium bg-green-900/20 px-6 py-3 rounded-md border border-green-500/20">
                                        Already Joined
                                    </div>
                                    {competition.requires_submission && (
                                        <div className="space-y-3">
                                            <Input
                                                className="bg-gray-700/50 border-gray-600 text-white"
                                                placeholder="Enter your HuggingFace submission URL"
                                                value={submissionUrl}
                                                onChange={(e) => setSubmissionUrl(e.target.value)}
                                            />
                                            <Button
                                                onClick={handleSubmitSolution}
                                                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600"
                                            >
                                                <Upload className="w-4 h-4 mr-2"/>
                                                Submit Solution
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                user?.type !== 'host' && (
                                    <Button
                                        onClick={handleJoinClick}
                                        className="w-full md:w-auto px-10 py-4 text-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                                    >
                                        Join Competition
                                    </Button>
                                )
                            )}
                        </div>
                    </div>
                </div>
            </div>


            {/* Competition Stats */}
            <div className="max-w-7xl mx-auto px-6 lg:px-8 py-8">
                {/* Stats Cards */}
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
                            <CardContent className="space-y-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-200 mb-2">Description</h3>
                                    <p className="text-gray-300">{competition.description}</p>
                                </div>

                                {/*<div>*/}
                                {/*    <h3 className="text-lg font-semibold text-gray-200 mb-2">Dataset Description</h3>*/}
                                {/*    <p className="text-gray-300">{competition.dataset_description}</p>*/}
                                {/*</div>*/}

                                {/*<div>*/}
                                {/*    <h3 className="text-lg font-semibold text-gray-200 mb-2">Evaluation Metric</h3>*/}
                                {/*    <p className="text-gray-300">{competition.evaluation_metric}</p>*/}
                                {/*</div>*/}

                                <Button
                                    onClick={handleDownloadClick}
                                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                                    disabled={!isUserInCompetition}
                                >
                                    {isUserInCompetition ? 'Download Dataset' : 'Join to Download Dataset'}
                                </Button>
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