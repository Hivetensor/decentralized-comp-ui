'use client';

import React, {useEffect, useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {Button} from "@/components/ui/button";
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {Clock, Plus} from 'lucide-react';

interface HostProfile {
    email: string;
    organization: string;
    contactName: string;
    registeredAt: string;
    status: 'pending' | 'approved';
}

const HostDashboard = () => {
    const router = useRouter();
    const [profile, setProfile] = useState<HostProfile | null>(null);
    const [competitions, setCompetitions] = useState<any[]>([]);

    useEffect(() => {
        // Load host profile from localStorage
        const emails = Object.keys(localStorage).filter(key => key.startsWith('host_'));
        if (emails.length === 0) {
            router.push('/host');
            return;
        }
        const hostData = localStorage.getItem(emails[0]);
        if (hostData) {
            setProfile(JSON.parse(hostData));
        }

        // Load competitions
        const savedCompetitions = localStorage.getItem(`competitions_${emails[0]}`);
        if (savedCompetitions) {
            setCompetitions(JSON.parse(savedCompetitions));
        }
    }, []);

    if (!profile) return null;

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
            <div className="max-w-7xl mx-auto space-y-6">
                {/* Header */}
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                            Host Dashboard
                        </h1>
                        <p className="mt-2 text-gray-400">
                            Manage your AI competitions
                        </p>
                    </div>
                    <Link href="/host/createCompetition">
                        <Button
                            className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                            <Plus className="h-4 w-4 mr-2"/>
                            Create Competition
                        </Button>
                    </Link>
                </div>

                {/* Profile Card */}
                <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-gray-100">Host Profile</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            <div className="flex justify-between items-center">
                                <div>
                                    <p className="text-gray-400">Organization</p>
                                    <p className="text-lg font-medium text-white">{profile.organization}</p>
                                </div>
                                <Badge
                                    className={
                                        profile.status === 'approved'
                                            ? 'bg-green-900/20 text-green-400 border-green-500/20'
                                            : 'bg-yellow-900/20 text-yellow-400 border-yellow-500/20'
                                    }
                                >
                                    {profile.status === 'approved' ? 'Approved' : 'Pending Approval'}
                                </Badge>
                            </div>
                            <div>
                                <p className="text-gray-400">Contact</p>
                                <p className="text-lg font-medium text-white">{profile.contactName}</p>
                            </div>
                            <div>
                                <p className="text-gray-400">Email</p>
                                <p className="text-lg font-medium text-white">{profile.email}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Competitions List */}
                <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-gray-100">Your Competitions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {competitions.length === 0 ? (
                                <div className="text-center py-8">
                                    <p className="text-gray-400">No competitions created yet</p>
                                    <Link href="/host/createCompetition">
                                        <Button variant="link" className="text-purple-400 mt-2">
                                            Create your first competition
                                        </Button>
                                    </Link>
                                </div>
                            ) : (
                                competitions.map((competition, index) => (
                                    <div
                                        key={index}
                                        className="p-4 bg-gray-900/50 rounded-lg border border-gray-700"
                                    >
                                        <div className="flex justify-between items-start">
                                            <div>
                                                <h3 className="text-lg font-semibold text-white">
                                                    {competition.title}
                                                </h3>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <Badge
                                                        className={
                                                            competition.status === 'active'
                                                                ? 'bg-green-900/20 text-green-400'
                                                                : 'bg-gray-800 text-gray-300'
                                                        }
                                                    >
                                                        {competition.status}
                                                    </Badge>
                                                    <div className="flex items-center text-gray-400 text-sm">
                                                        <Clock className="h-4 w-4 mr-1"/>
                                                        Created {new Date(competition.createdAt).toLocaleDateString()}
                                                    </div>
                                                </div>
                                            </div>
                                            <Link href={`/competitions/${competition.id}`}>
                                                <Button variant="outline" className="border-gray-600 text-gray-300">
                                                    View
                                                </Button>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default HostDashboard;