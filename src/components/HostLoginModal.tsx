import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {X} from 'lucide-react';

interface HostLoginModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { email: string; organization: string; contactName: string }) => void;
}

export const HostLoginModal = ({isOpen, onClose, onSubmit}: HostLoginModalProps) => {
    const [email, setEmail] = useState('');
    const [organization, setOrganization] = useState('');
    const [contactName, setContactName] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSubmit({email, organization, contactName});
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-lg max-w-md w-full border border-gray-800">
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Login as Host
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X className="h-5 w-5"/>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label className="text-gray-300">Email</Label>
                        <Input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-300">Organization</Label>
                        <Input
                            value={organization}
                            onChange={(e) => setOrganization(e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="Enter your organization"
                            required
                        />
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-300">Contact Name</Label>
                        <Input
                            value={contactName}
                            onChange={(e) => setContactName(e.target.value)}
                            className="bg-gray-800 border-gray-700 text-white"
                            placeholder="Enter your name"
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