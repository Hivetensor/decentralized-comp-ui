'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useUser} from '@/contexts/UserContext';
import {RegistrationChoiceModal} from './RegistrationChoiceModal';
import {UserRegistrationModal} from '@/components/UserRegistrationModal';
import {HostRegistrationModal} from '@/components/HostRegistrationModal';
import {toast} from '@/hooks/use-toast';
import {api} from '@/services/api';

const NavigationMenu = () => {
    const router = useRouter();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [showChoiceModal, setShowChoiceModal] = useState(false);
    const [showCompetitorRegistration, setShowCompetitorRegistration] = useState(false);
    const [showHostRegistration, setShowHostRegistration] = useState(false);
    const {user, registerUser} = useUser();

    const handleRegistrationClick = () => {
        if (user) {
            router.push(`/profile/${user.walletAddress}`);
        } else {
            setShowChoiceModal(true);
        }
    };

    const handleCompetitorRegistration = async (data: { username: string; walletAddress: string }) => {
        try {
            const response = await api.users.register(data);

            registerUser(data.username, data.walletAddress);

            toast({
                title: "Registration Successful",
                description: "Welcome to HiveTensor!",
                variant: "success",
            });

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

    const getHostEmail = () => {
        const hostKey = Object.keys(localStorage).find(key => key.startsWith('host_'));
        if (hostKey) {
            const hostData = JSON.parse(localStorage.getItem(hostKey) || '{}');
            return hostData.email;
        }
        return null;
    };

    const handleProfileClick = () => {
        const hostEmail = getHostEmail();
        if (user) {
            router.push(`/profile/${user.walletAddress}`);
        } else if (hostEmail) {
            router.push(`/host/profile/${hostEmail}`);
        } else {
            setShowChoiceModal(true);
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
                            </Link>{/*
                            <Link href="/leaderboard"
                                  className="text-gray-300 hover:text-white transition-colors text-base font-medium">
                                Leaderboard
                            </Link>*/}
                            <Link href="/about"
                                  className="text-gray-300 hover:text-white transition-colors text-base font-medium">
                                About
                            </Link>
                        </div>
                    </div>

                    <div className="flex-1 flex justify-end">
                        <button
                            onClick={handleProfileClick}
                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-md text-white"
                        >
                            {user ? 'My Profile' : (getHostEmail() ? 'Host Dashboard' : 'Register')}
                        </button>
                    </div>

                    <div className="md:hidden ml-4">
                        <button
                            type="button"
                            className="p-2 text-gray-300 hover:text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                                      d="M4 6h16M4 12h16M4 18h16"/>
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {mobileMenuOpen && (
                <div className="md:hidden absolute w-full bg-gray-900 border-b border-gray-800 shadow-lg z-50">
                    <div className="px-4 py-3 space-y-3">
                        <Link
                            href="/competitions"
                            className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Competitions
                        </Link>
                        <Link
                            href="/datasets"
                            className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Datasets
                        </Link>
                        <Link
                            href="/leaderboard"
                            className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Leaderboard
                        </Link>
                    </div>
                </div>
            )}

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