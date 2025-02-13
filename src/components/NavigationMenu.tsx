'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import {useRouter} from 'next/navigation';
import {useAuth} from '@/contexts/AuthContext';
import {UserRegistrationModal} from '@/components/UserRegistrationModal';
import {HostRegistrationModal} from '@/components/HostRegistrationModal';
import {RegistrationChoiceModal} from '@/components/RegistrationChoiceModal';
import {toast} from '@/hooks/use-toast';
import {User} from 'lucide-react';


const NavigationMenu = () => {
    const router = useRouter();
    const {user, register, login, logout} = useAuth();
    const [showChoiceModal, setShowChoiceModal] = useState(false);
    const [showCompetitorRegistration, setShowCompetitorRegistration] = useState(false);
    const [showHostRegistration, setShowHostRegistration] = useState(false);
    const [showProfileMenu, setShowProfileMenu] = useState(false);

    // components/NavigationMenu.tsx
    const handleCompetitorRegistration = async (data: { username: string; walletAddress: string }) => {
        try {
            try {
                // Try logging in first
                await login.competitor(data.username, data.walletAddress);
                toast({
                    title: "Welcome Back!",
                    description: "You were already registered. Logged in successfully.",
                    variant: "success",
                });
            } catch {
                // If login fails, try registering
                await register.competitor(data.username, data.walletAddress);
                toast({
                    title: "Registration Successful",
                    description: "Welcome to HiveTensor!",
                    variant: "success",
                });
            }
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
            await register.host(data.email, data.organization, data.contactName);
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
        <div className="bg-gray-900 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/" className="flex items-center">
                            <span
                                className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                HiveTensor
                            </span>
                        </Link>
                    </div>

                    {/* Main Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/competitions" className="text-gray-300 hover:text-white transition-colors">
                            Competitions
                        </Link>
                        <Link href="/datasets" className="text-gray-300 hover:text-white transition-colors">
                            Datasets
                        </Link>
                        <Link href="/leaderboard" className="text-gray-300 hover:text-white transition-colors">
                            Leaderboard
                        </Link>
                        <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                            About
                        </Link>
                    </div>

                    {/* Auth Section */}
                    {user ? (
                        <div className="relative">
                            <button
                                onClick={() => setShowProfileMenu(!showProfileMenu)}
                                className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                            >
                                <User className="h-6 w-6 text-gray-300"/>
                            </button>

                            {showProfileMenu && (
                                <div
                                    className="absolute right-0 mt-2 w-48 py-2 bg-gray-900 rounded-md shadow-xl border border-gray-800 z-20">
                                    <Link
                                        href={user.type === 'competitor'
                                            ? `/profile/${user.data.walletAddress}`
                                            : '/host/dashboard'
                                        }
                                        className="block px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors"
                                        onClick={() => setShowProfileMenu(false)}
                                    >
                                        Profile
                                    </Link>
                                    <button
                                        onClick={async () => {
                                            await logout();
                                            setShowProfileMenu(false);
                                            router.push('/');
                                        }}
                                        className="block w-full text-left px-4 py-2 text-gray-300 hover:bg-gray-800 transition-colors"
                                    >
                                        Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <button
                            onClick={() => setShowChoiceModal(true)}
                            className="px-6 py-2 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-md text-white"
                        >
                           Login / Register
                        </button>
                    )}
                </div>
            </div>

            {/* Registration Modals */}
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