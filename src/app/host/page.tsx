'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Building, Mail, User} from 'lucide-react';

const HostRegistrationPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        organization: '',
        contactName: '',
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Mock API call - replace with real API later
            await new Promise(resolve => setTimeout(resolve, 1000));
            localStorage.setItem('host_' + formData.email, JSON.stringify({
                ...formData,
                registeredAt: new Date().toISOString(),
                status: 'pending'
            }));
            setSuccess(true);
            setTimeout(() => {
                router.push('/host/dashboard');
            }, 2000);
        } catch (err) {
            setError('Failed to register. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
            <div className="max-w-xl mx-auto space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Become a Competition Host
                    </h1>
                    <p className="mt-2 text-gray-400">
                        Register to create and manage AI competitions
                    </p>
                </div>

                <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-gray-100">Host Registration</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-gray-200">Email</Label>
                                <div className="relative">
                                    <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                                    <Input
                                        type="email"
                                        required
                                        className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                                        placeholder="Enter your email"
                                        value={formData.email}
                                        onChange={(e) => setFormData(prev => ({...prev, email: e.target.value}))}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-200">Organization</Label>
                                <div className="relative">
                                    <Building className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                                    <Input
                                        required
                                        className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                                        placeholder="Organization name"
                                        value={formData.organization}
                                        onChange={(e) => setFormData(prev => ({...prev, organization: e.target.value}))}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-200">Contact Name</Label>
                                <div className="relative">
                                    <User className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                                    <Input
                                        required
                                        className="pl-10 bg-gray-700/50 border-gray-600 text-white placeholder:text-gray-400"
                                        placeholder="Your full name"
                                        value={formData.contactName}
                                        onChange={(e) => setFormData(prev => ({...prev, contactName: e.target.value}))}
                                    />
                                </div>
                            </div>

                            {error && (
                                <Alert variant="destructive" className="bg-red-900/20 border-red-900">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            {success && (
                                <Alert className="bg-green-900/20 border-green-900">
                                    <AlertDescription>Registration successful! Redirecting...</AlertDescription>
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                            >
                                {loading ? 'Registering...' : 'Register as Host'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default HostRegistrationPage;