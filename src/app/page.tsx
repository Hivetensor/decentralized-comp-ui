import React from 'react';
import { Badge } from "@/components/ui/badge";
import Link from 'next/link'; // Add this import at the top
import { Button } from '@/components/ui/button';


const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative min-h-[600px] overflow-hidden"> {/* Increased height */}
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-cyan-900/50" />
        <div className="relative px-6 py-32 mx-auto max-w-7xl"> {/* More vertical padding */}
          <div className="flex flex-col md:flex-row items-center gap-12">
            {/* Left content */}
            <div className="flex-1 text-left">
              <h1 className="text-6xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                Solving real life AI and Data Science problems through Competitions
              </h1>

              <div className="flex gap-4 mb-12">
                <Link href="/competitions">
                  <Button className="px-10 py-8 text-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                    Join a Competition
                  </Button>
                </Link>
                <Link href="/competitions/create">
                  <Button className="px-10 py-8 text-lg bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 ">
                    Host a Competition
                  </Button>
                </Link>
              </div>
            </div>

            {/* Right content - Image placeholder */}
            <div className="flex-1 p-8">
              <div className="aspect-square bg-gray-800/50 rounded-lg flex items-center justify-center text-gray-400">
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