'use client';

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { X } from 'lucide-react';

interface UserRegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { username: string; walletAddress: string }) => void;
}

export const UserRegistrationModal = ({ isOpen, onClose, onSubmit }: UserRegistrationModalProps) => {
    const [username, setUsername] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [error, setError] = useState('');

    if (!isOpen) return null;

    const generateRandomUsername = () => {
        const adjectives = ['Happy', 'Clever', 'Swift', 'Bright', 'Noble'];
        const nouns = ['Validator', 'Miner', 'Builder', 'Creator', 'Developer'];
        const randomNumber = Math.floor(Math.random() * 1000);
        const randomUsername = `${adjectives[Math.floor(Math.random() * adjectives.length)]}${nouns[Math.floor(Math.random() * nouns.length)]}${randomNumber}`;
        setUsername(randomUsername);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username.trim() || !walletAddress.trim()) {
            setError('Both username and wallet address are required');
            return;
        }
        onSubmit({ username, walletAddress });
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-lg max-w-md w-full border border-gray-800">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Join Competition
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X className="h-5 w-5" />
                    </button>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label className="text-gray-300">Username</Label>
                        <div className="flex gap-2">
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                                placeholder="Choose a username"
                            />
                            <Button
                                type="button"
                                variant="secondary"
                                onClick={generateRandomUsername}
                                className="bg-gray-800 text-gray-300 hover:bg-gray-700"
                            >
                                Random
                            </Button>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-300">Wallet Address</Label>
                        <Input
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                            placeholder="Enter your wallet address"
                        />
                    </div>

                    {error && (
                        <p className="text-red-400 text-sm">{error}</p>
                    )}

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                    >
                        Register & Join
                    </Button>
                </form>
            </div>
        </div>
    );
};