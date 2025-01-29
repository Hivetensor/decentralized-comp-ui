// components/RegistrationChoiceModal.tsx
import React from 'react';
import {X} from 'lucide-react';

interface RegistrationChoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onChooseCompetitor: () => void;
    onChooseHost: () => void;
}

export const RegistrationChoiceModal = ({
                                            isOpen,
                                            onClose,
                                            onChooseCompetitor,
                                            onChooseHost
                                        }: RegistrationChoiceModalProps) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-lg max-w-md w-full border border-gray-800">
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Choose Registration Type
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X className="h-5 w-5"/>
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <button
                        onClick={onChooseCompetitor}
                        className="w-full p-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-lg text-white transition-all"
                    >
                        <h3 className="text-lg font-semibold">Register as Competitor</h3>
                        <p className="text-sm text-gray-200">Join competitions and submit solutions</p>
                    </button>

                    <button
                        onClick={onChooseHost}
                        className="w-full p-4 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-lg text-white transition-all"
                    >
                        <h3 className="text-lg font-semibold">Register as Host</h3>
                        <p className="text-sm text-gray-200">Create and manage competitions</p>
                    </button>
                </div>
            </div>
        </div>
    );
};