import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {X} from 'lucide-react';

interface CompetitorLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { username: string; walletAddress: string }) => void;
}

export const CompetitorLoginModal = ({isOpen, onClose, onSubmit}: CompetitorLoginModalProps) => {
    const [username, setUsername] = useState('');
    const [walletAddress, setWalletAddress] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({username, walletAddress});
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-lg max-w-md w-full border border-gray-800">
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Login as Competitor
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X className="h-5 w-5"/>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label className="text-gray-300">Username</Label>
                        <Input
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="Enter your username"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-300">Wallet Address</Label>
                        <Input
                            value={walletAddress}
                            onChange={(e) => setWalletAddress(e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="Enter your wallet address"
                            required
                        />
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                    >
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
};