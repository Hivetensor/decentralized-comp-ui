'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {useUser} from '@/contexts/UserContext';
import {Button} from '@/components/ui/button';
import {HostRegistrationModal} from '@/components/HostRegistrationModal';
import {toast} from '@/hooks/use-toast';
import {api} from '@/services/api';

const HomePage = () => {
    const router = useRouter();
    const {user} = useUser();
    const [showHostRegistration, setShowHostRegistration] = useState(false);

    const handleJoinClick = () => {
        if (user) {
            router.push('/competitions');
        } else {
            router.push('/competitions');
        }
    };

    const handleHostClick = () => {
        setShowHostRegistration(true);
    };

    const handleHostRegistration = async (data: { email: string; organization: string; contactName: string }) => {
        try {
            const response = await api.hosts.register(data);
            toast({
                title: "Host Registration Successful",
                description: "You can now create competitions!",
                variant: "success",
            });
            setShowHostRegistration(false);
            router.push('/host/createCompetition');
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
                    {/* Removed the flex-row layout and made content centered */}
                    <div className="text-center max-w-4xl mx-auto">
                        <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 md:mb-24 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                            Solving real life AI and Data Science problems through Competitions
                        </h1>

                        <div className="flex flex-col md:flex-row justify-center gap-4 mb-8 md:mb-12">
                            <Button
                                onClick={handleJoinClick}
                                className="w-full md:w-auto px-6 md:px-10 py-4 md:py-8 text-base md:text-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-md"
                            >
                                Join a Competition
                            </Button>
                            <Button
                                onClick={handleHostClick}
                                className="w-full md:w-auto px-6 md:px-10 py-4 md:py-8 text-base md:text-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-md"
                            >
                                Host a Competition
                            </Button>
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