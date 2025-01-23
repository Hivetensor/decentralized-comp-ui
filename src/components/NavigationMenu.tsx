'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import { UserCircle}  from "lucide-react";
import { useUser } from '@/contexts/UserContext';

const NavigationMenu = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [profileDropdownOpen, setProfileDropdownOpen] = useState(false);
    const { user } = useUser();


    return (
        <div className="bg-gray-900 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    {/* Logo - stays left on desktop, centers on mobile */}
                    <div className="flex-1 flex items-center justify-center md:justify-start">
                        <Link href="/" className="flex items-center">
                            <span
                                className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                HiveTensor
                            </span>
                        </Link>
                    </div>

                    {/* Desktop Navigation - centered */}
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
                        </div>
                    </div>

                    {/* Profile Section */}
                    <div className="relative">
                        {user ? (
                            <>
                                <button
                                    onClick={() => setProfileDropdownOpen(!profileDropdownOpen)}
                                    className="flex items-center gap-2 text-gray-300 hover:text-white"
                                >
                                    <UserCircle className="h-6 w-6" />
                                    <span className="hidden md:block">{user.username}</span>
                                </button>

                                {/* Profile Dropdown */}
                                {profileDropdownOpen && (
                                    <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-gray-800 ring-1 ring-black ring-opacity-5 z-50">
                                        <Link
                                            href={`/profile/${user.walletAddress}`}
                                            className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-700"
                                            onClick={() => setProfileDropdownOpen(false)}
                                        >
                                            View Profile
                                        </Link>
                                        <div className="border-t border-gray-700 my-1" />
                                        <div className="px-4 py-2">
                                            <div className="text-sm text-gray-400">
                                                Active Competitions
                                            </div>
                                            <div className="text-sm font-medium text-white">
                                                {user.competitions?.filter(c => c.status === 'active').length || 0}
                                            </div>
                                        </div>
                                        <div className="border-t border-gray-700 my-1" />
                                        <button
                                            onClick={() => {
                                                localStorage.removeItem('user');
                                                window.location.reload();
                                            }}
                                            className="block w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-gray-700"
                                        >
                                            Log Out
                                        </button>
                                    </div>
                                )}
                            </>
                        ) : (
                            <Link href="/competitions" className="text-gray-300 hover:text-white">
                                <UserCircle className="h-6 w-6" />
                            </Link>
                        )}
                    </div>
                    {/* Mobile Menu Button - right aligned */}
                    <div className="md:hidden flex items-center">
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

                    {/* Empty div to maintain spacing where wallet button was */}
                    <div className="hidden md:block flex-1"/>
                </div>
            </div>

            {/* Mobile Menu Panel */}
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
        </div>
    );
};

export default NavigationMenu;