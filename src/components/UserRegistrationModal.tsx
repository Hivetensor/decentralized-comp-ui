'use client';

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {z} from "zod";
import {X} from 'lucide-react'; // Add this import

interface UserRegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { username: string; walletAddress: string }) => void;
}

const userSchema = z.object({
    username: z.string()
        .min(3, "Username must be at least 3 characters")
        .max(50, "Username must be less than 50 characters"),
    walletAddress: z.string()
        .min(20, "Invalid wallet address length")
        .max(62, "Invalid wallet address length")
    // .regex(/^5[a-zA-Z0-9]{47}$/, "Invalid Bittensor wallet address format")
});

export const UserRegistrationModal = ({isOpen, onClose, onSubmit}: UserRegistrationModalProps) => {
    const [username, setUsername] = useState('');
    const [walletAddress, setWalletAddress] = useState('');
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    if (!isOpen) return null; // Add this line to conditionally render

    const validateForm = () => {
        try {
            userSchema.parse({username, walletAddress});
            setErrors({});
            return true;
        } catch (error) {
            if (error instanceof z.ZodError) {
                const newErrors: { [key: string]: string } = {};
                error.errors.forEach((err) => {
                    if (err.path) {
                        newErrors[err.path[0]] = err.message;
                    }
                });
                setErrors(newErrors);
            }
            return false;
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        onSubmit({username, walletAddress});
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-lg max-w-md w-full border border-gray-800">
                {/* Add header with close button */}
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Register as Competitor
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X className="h-5 w-5"/>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label className="text-gray-300">Username</Label>
                        <div className="flex gap-2">
                            <Input
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                className={`bg-gray-800 border-gray-700 text-white ${
                                    errors.username ? 'border-red-500' : ''
                                }`}
                                placeholder="Choose a username"
                            />
                        </div>
                        {errors.username && (
                            <p className="text-red-400 text-sm mt-1">{errors.username}</p>
                        )}
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-300">Wallet Address</Label>
                        <Input
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                            className={`bg-gray-800 border-gray-700 text-white ${
                                errors.walletAddress ? 'border-red-500' : ''
                            }`}
                            placeholder="Enter your wallet address"
                        />
                        {errors.walletAddress && (
                            <p className="text-red-400 text-sm mt-1">{errors.walletAddress}</p>
                        )}
                    </div>

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