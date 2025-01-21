'use client';

import React, {useState} from 'react';
import Link from 'next/link';
import {Button} from "@/components/ui/button";
import {WalletCards} from 'lucide-react';

const NavigationMenu = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isLoggedIn = false;
    const userAddress = '0x1234...5678';

    return (
        <div className="bg-gray-900 border-b border-gray-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-24">
                    {/* Mobile hamburger */}
                    <div className="md:hidden">
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

                    {/* Logo and desktop nav */}
                    <div className="flex items-center md:flex-1">
                        <Link href="/" className="mx-auto md:mx-0">
              <span
                  className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 ">
                HiveTensor
              </span>
                        </Link>

                        <div className="hidden md:flex items-center ml-10 space-x-8">
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

                    {/* Auth section */}
                    <div className="flex items-center">
                        {isLoggedIn ? (
                            <>
                                <code className="hidden md:block bg-gray-800 px-3 py-1 rounded text-sm text-gray-300">
                                    {userAddress}
                                </code>
                                <Link href="/profile">
                                    <Button variant="ghost" className="text-gray-300 hover:text-white">
                                        Profile
                                    </Button>
                                </Link>
                            </>
                        ) : (
                            <Link href="/auth">
                                <Button
                                    className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                                    <WalletCards className="mr-2 h-4 w-4"/>
                                    <span className="hidden md:inline">Connect Wallet</span>
                                    <span className="md:hidden">Link Wallet</span>
                                </Button>
                            </Link>
                        )}
                    </div>
                </div>
            </div>

            {/* Mobile menu panel */}
            {mobileMenuOpen && (
                <div className="md:hidden absolute w-full bg-gray-900 border-b border-gray-800 shadow-lg">
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
                        <Link
                            href="/learn"
                            className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Learn
                        </Link>
                        <Link
                            href="/jobs"
                            className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Jobs
                        </Link>
                        <Link
                            href="/about"
                            className="block px-3 py-2 text-base font-medium text-gray-300 hover:text-white hover:bg-gray-800 rounded-md"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            About
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
};

export default NavigationMenu;