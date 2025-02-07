'use client';

import React, {useState} from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { HostRegistrationModal } from '@/components/HostRegistrationModal';
import { toast } from '@/hooks/use-toast';

const HomePage = () => {
    const router = useRouter();
    const { user, login } = useAuth();
    const [showHostRegistration, setShowHostRegistration] = useState(false);

    const handleJoinClick = () => {
        if (user) {
            if (user.type === 'competitor') {
                router.push('/competitions');
            } else {
                toast({
                    title: "Access Denied",
                    description: "Only competitors can join competitions",
                    variant: "destructive",
                });
            }
        } else {
            router.push('/competitions');
        }
    };

    const handleHostClick = () => {
        if (user) {
            if (user.type === 'host') {
                router.push('/host/dashboard');
            } else {
                toast({
                    title: "Access Denied",
                    description: "You're already registered as a competitor",
                    variant: "destructive",
                });
            }
        } else {
            setShowHostRegistration(true);
        }
    };

    const handleHostRegistration = async (data: { email: string; organization: string; contactName: string }) => {
        try {
            await login.host(data.email, data.organization, data.contactName);
            setShowHostRegistration(false);
            router.push('/host/dashboard');
        } catch (error) {
            toast({
                title: "Registration Failed",
                description: error instanceof Error ? error.message : "Please try again",
                variant: "destructive",
            });
        }
    };
    return (
        <div className="bg-black text-white flex flex-col min-h-screen">
            <div className="flex-grow relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-cyan-900/50"/>
                <div className="relative px-4 py-12 md:px-6 md:py-32 mx-auto max-w-7xl">
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 md:mb-24 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                            Solving real life AI and Data Science problems through Competitions
                        </h1>

                        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8 md:mb-12">
                            {user ? (
                                user.type === 'competitor' ? (
                                    <Button
                                        onClick={() => router.push('/competitions')}
                                        className="w-full md:w-auto px-6 md:px-10 py-4 md:py-8 text-base md:text-lg bg-gradient-to-r from-purple-600 to-cyan-600"
                                    >
                                        View Competitions
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={() => router.push('/host/dashboard')}
                                        className="w-full md:w-auto px-6 md:px-10 py-4 md:py-8 text-base md:text-lg bg-gradient-to-r from-purple-600 to-cyan-600"
                                    >
                                        Host Dashboard
                                    </Button>
                                )
                            ) : (
                                <>
                                    <Button
                                        onClick={handleJoinClick}
                                        className="w-full md:w-auto px-6 md:px-10 py-4 md:py-8 text-base md:text-lg bg-gradient-to-r from-purple-600 to-cyan-600"
                                    >
                                        Join a Competition
                                    </Button>
                                    <Button
                                        onClick={handleHostClick}
                                        className="w-full md:w-auto px-6 md:px-10 py-4 md:py-8 text-base md:text-lg bg-gradient-to-r from-purple-600 to-cyan-600"
                                    >
                                        Host a Competition
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <HostRegistrationModal
                isOpen={showHostRegistration}
                onClose={() => setShowHostRegistration(false)}
                onSubmit={handleHostRegistration}
            />
        </div>
    );
};

export default HomePage;