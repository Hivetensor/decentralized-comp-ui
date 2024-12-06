'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { WalletCards } from 'lucide-react';

const NavigationMenu = () => {
  // In real app, this would come from auth state
  const isLoggedIn = false;
  const userAddress = '0x1234...5678';

  return (
    <div className="bg-gray-900 border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo and primary nav */}
          <div className="flex items-center">
            <Link href="/">
              <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                AI Arena
              </span>
            </Link>
            
            <div className="hidden md:flex items-center ml-10 space-x-8">
              <Link href="/competitions" className="text-gray-300 hover:text-white transition-colors">
                Competitions
              </Link>
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                About
              </Link>
            </div>
          </div>

          {/* Auth section */}
          <div className="flex items-center gap-4">
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
                <Button className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                  <WalletCards className="mr-2 h-4 w-4" />
                  Connect Wallet
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavigationMenu;