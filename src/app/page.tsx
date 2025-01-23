import React from 'react';
import Link from 'next/link'; // Add this import at the top
import {Button} from '@/components/ui/button';


const HomePage = () => {
    return (
        <div className="bg-black text-white flex flex-col min-h-screen">
            {/* Hero Section */}
            <div className="flex-grow relative">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-cyan-900/50"/>
                <div className="relative px-4 py-12 md:px-6 md:py-32 mx-auto max-w-7xl">
                    <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12">
                        {/* Left content */}
                        <div className="flex-1 text-center md:text-left">
                            <h1 className="text-3xl md:text-4xl lg:text-6xl font-bold mb-6 md:mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                                Solving real life AI and Data Science problems through Competitions
                            </h1>

                            <div className="flex flex-col md:flex-row gap-4 mb-8 md:mb-12">
                                <Link href="/competitions">
                                    <button className="w-full md:w-auto px-6 md:px-10 py-4 md:py-8 text-base md:text-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-md">
                                        Join a Competition
                                    </button>
                                </Link>
                                <Link href="/host">
                                    <button className="w-full md:w-auto px-6 md:px-10 py-4 md:py-8 text-base md:text-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-md">
                                        Host a Competition
                                    </button>
                                </Link>
                            </div>
                        </div>

                        {/* Right content - Image placeholder */}
                        <div className="flex-1 w-full md:w-auto p-4 md:p-8">
                            <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center text-gray-400 text-sm md:text-base">
                                Some image? Data/Neural net? brain
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;