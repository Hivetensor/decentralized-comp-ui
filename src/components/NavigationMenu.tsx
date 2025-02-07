'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/contexts/AuthContext';
import {UserRegistrationModal} from '@/components/UserRegistrationModal';
import {HostRegistrationModal} from '@/components/HostRegistrationModal';
import {RegistrationChoiceModal} from '@/components/RegistrationChoiceModal';
import {toast} from '@/hooks/use-toast';
import {api} from "@/services/api";

const NavigationMenu = () => {
    const router = useRouter();
    const {user, login, logout} = useAuth();
    const [showChoiceModal, setShowChoiceModal] = useState(false);
    const [showCompetitorRegistration, setShowCompetitorRegistration] = useState(false);
    const [showHostRegistration, setShowHostRegistration] = useState(false);

    const handleCompetitorRegistration = async (data: { username: string; walletAddress: string }) => {
        try {
            await login(data.username, data.walletAddress);
            setShowCompetitorRegistration(false);
            router.push(`/profile/${data.walletAddress}`);
        } catch (error) {
            toast({
                title: "Registration Failed",
                description: error instanceof Error ? error.message : "Please try again",
                variant: "destructive",
            });
        }
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
        <div className="bg-gray-900 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    <div className="flex-1 flex items-center justify-center md:justify-start">
                        <Link href="/" className="flex items-center">
                            <span
                                className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                HiveTensor
                            </span>
                        </Link>
                    </div>

                    <div className="hidden md:flex items-center justify-center flex-1">
                        <div className="flex space-x-8">
                            <Link href="/competitions"
                                  className="text-gray-300 hover:text-white transition-colors text-base font-medium">
                                Competitions
                            </Link>
                            <Link href="/datasets"
                                  className="text-gray-300 hover:text-white transition-colors text-base font-medium">
                                Datasets
                            </Link>
                            <Link href="/leaderboard"
                                  className="text-gray-300 hover:text-white transition-colors text-base font-medium">
                                Leaderboard
                            </Link>
                            <Link href="/about"
                                  className="text-gray-300 hover:text-white transition-colors text-base font-medium">
                                About
                            </Link>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-end">
                        {user ? (
                            <div className="flex items-center gap-4">
                                <span className="text-gray-300">
                                    Welcome, {user.username}
                                </span>
                                <button
                                    onClick={async () => {
                                        await logout();
                                        router.push('/');
                                    }}
                                    className="px-4 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-md text-white"
                                >
                                    Logout
                                </button>
                            </div>
                        ) : (
                            <button
                                onClick={() => setShowChoiceModal(true)}
                                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-md text-white"
                            >
                                Connect Wallet
                            </button>
                        )}
                    </div>
                </div>
            </div>

            <RegistrationChoiceModal
                isOpen={showChoiceModal}
                onClose={() => setShowChoiceModal(false)}
                onChooseCompetitor={() => {
                    setShowChoiceModal(false);
                    setShowCompetitorRegistration(true);
                }}
                onChooseHost={() => {
                    setShowChoiceModal(false);
                    setShowHostRegistration(true);
                }}
            />

            <UserRegistrationModal
                isOpen={showCompetitorRegistration}
                onClose={() => setShowCompetitorRegistration(false)}
                onSubmit={handleCompetitorRegistration}
            />

            <HostRegistrationModal
                isOpen={showHostRegistration}
                onClose={() => setShowHostRegistration(false)}
                onSubmit={handleHostRegistration}
            />
        </div>
    );
};

export default NavigationMenu;