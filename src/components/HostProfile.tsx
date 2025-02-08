'use client';

import React, {useEffect, useState} from 'react';
import {useParams} from 'next/navigation';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {api} from '@/services/api';
import Link from 'next/link';

interface HostProfile {
    email: string;
    organization: string;
    contact_name: string;
    status: string;
    created_at: string;
    competitions: {
        id: number;
        title: string;
        status: string;
        participants: number;
        start_date: string;
        deadline: string;
    }[];
}

export default function HostProfile() {
    const params = useParams();
    const [profile, setProfile] = useState<HostProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                setLoading(true);
                const data = await api.hosts.getProfile();
                setProfile(data);
            } catch (err) {
                setError(err instanceof Error ? err.message : 'Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, [params.email]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error || !profile) {
        return <div>Error loading profile</div>;
    }

    return (
        <div className="min-h-screen bg-black text-white">
            <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-8">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Host Dashboard
                    </h1>
                    <div className="mt-4">
                        <p className="text-gray-300">Organization: {profile.organization}</p>
                        <p className="text-gray-300">Contact: {profile.contact_name}</p>
                        <Badge className={profile.status === 'approved' ? 'bg-green-900/20' : 'bg-yellow-900/20'}>
                            {profile.status}
                        </Badge>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto p-6">
                <Card className="bg-gray-900 border-gray-800">
                    <CardHeader>
                        <CardTitle className="text-gray-100">Your Competitions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {profile.competitions?.map((competition) => (
                                <Link key={competition.id} href={`/competitions/${competition.id}`}>
                                    <div
                                        className="p-4 bg-gray-800/50 rounded-lg border border-gray-700 hover:border-purple-500">
                                        <h3 className="text-xl font-bold">{competition.title}</h3>
                                        <div className="mt-2 flex items-center gap-4">
                                            <Badge>{competition.status}</Badge>
                                            <span
                                                className="text-gray-400">{competition.participants} participants</span>
                                        </div>
                                        <div className="mt-2 text-sm text-gray-400">
                                            <p>Starts: {new Date(competition.start_date).toLocaleDateString()}</p>
                                            <p>Ends: {new Date(competition.deadline).toLocaleDateString()}</p>
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
}