// components/HostRegistrationModal.tsx
'use client';

import React, {useState} from 'react';
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {Building, Mail, User, X} from 'lucide-react';
import {z} from "zod";

const hostSchema = z.object({
    email: z.string()
        .email("Invalid email address"),
    organization: z.string()
        .min(2, "Organization name must be at least 2 characters")
        .max(100, "Organization name must be less than 100 characters"),
    contactName: z.string()
        .min(2, "Contact name must be at least 2 characters")
        .max(100, "Contact name must be less than 100 characters")
});

interface HostRegistrationModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: { email: string; organization: string; contactName: string }) => void;
}

export const HostRegistrationModal = ({isOpen, onClose, onSubmit}: HostRegistrationModalProps) => {
    const [formData, setFormData] = useState({
        email: '',
        organization: '',
        contactName: ''
    });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    if (!isOpen) return null;

    const validateForm = () => {
        try {
            hostSchema.parse(formData);
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
        onSubmit(formData);
    };

    return (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-lg max-w-md w-full border border-gray-800">
                <div className="flex items-center justify-between p-6 border-b border-gray-800">
                    <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Register as Host
                    </h2>
                    <button onClick={onClose} className="text-gray-400 hover:text-white">
                        <X className="h-5 w-5"/>
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="space-y-2">
                        <Label className="text-gray-200">Email</Label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                            <Input
                                type="email"
                                required
                                className={`pl-10 bg-gray-700/50 border-gray-600 text-white ${
                                    errors.email ? 'border-red-500' : ''
                                }`}
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                            />
                            {errors.email && (
                                <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-200">Organization</Label>
                        <div className="relative">
                            <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                            <Input
                                required
                                className={`pl-10 bg-gray-700/50 border-gray-600 text-white ${
                                    errors.organization ? 'border-red-500' : ''
                                }`}
                                placeholder="Organization name"
                                value={formData.organization}
                                onChange={(e) => setFormData(prev => ({...prev, organization: e.target.value}))}
                            />
                            {errors.organization && (
                                <p className="text-red-400 text-sm mt-1">{errors.organization}</p>
                            )}
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label className="text-gray-200">Contact Name</Label>
                        <div className="relative">
                            <User className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                            <Input
                                required
                                className={`pl-10 bg-gray-700/50 border-gray-600 text-white ${
                                    errors.contactName ? 'border-red-500' : ''
                                }`}
                                placeholder="Your full name"
                                value={formData.contactName}
                                onChange={(e) => setFormData(prev => ({...prev, contactName: e.target.value}))}
                            />
                            {errors.contactName && (
                                <p className="text-red-400 text-sm mt-1">{errors.contactName}</p>
                            )}
                        </div>
                    </div>

                    <Button
                        type="submit"
                        className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                    >
                        Register as Host
                    </Button>
                </form>
            </div>
        </div>
    );
};