// components/ComingSoon.tsx
'use client';

import React from 'react';
import {Construction} from 'lucide-react';
import Link from 'next/link';
import {Button} from './ui/button';

export default function ComingSoon() {
    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center">
            <div className="text-center px-4">
                <Construction className="h-20 w-20 mx-auto mb-6 text-purple-400"/>
                <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                    Coming Soon
                </h1>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                    This feature is under construction and will be available soon.
                </p>
                <Link href="/">
                    <Button
                        className="bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700">
                        Back to Home
                    </Button>
                </Link>
            </div>
        </div>
    );
}