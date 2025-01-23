'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar, Trophy, Clock, FileText, Target } from 'lucide-react';

const CreateCompetitionForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        prize: '',
        difficulty: '',
        startDate: '',
        endDate: '',
        datasetDescription: '',
        evaluationMetric: '',
        submissionFormat: '',
        rules: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            // Mock API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Get host email from localStorage
            const hostEmail = Object.keys(localStorage).find(key => key.startsWith('host_'));
            if (!hostEmail) throw new Error('Host not found');

            // Get existing competitions or create new array
            const existingCompetitions = JSON.parse(localStorage.getItem(`competitions_${hostEmail}`) || '[]');

            const newCompetition = {
                id: Date.now(),
                ...formData,
                createdAt: new Date().toISOString(),
                status: 'pending',
                participants: 0
            };

            localStorage.setItem(
                `competitions_${hostEmail}`,
                JSON.stringify([...existingCompetitions, newCompetition])
            );

            router.push('/host/dashboard');
        } catch (err) {
            setError('Failed to create competition. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-6">
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Create New Competition
                    </h1>
                    <p className="mt-2 text-gray-400">
                        Set up your AI competition details
                    </p>
                </div>

                <Card className="bg-gray-800/50 border-gray-700">
                    <CardHeader>
                        <CardTitle className="text-gray-100">Competition Details</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-gray-200">Competition Title</Label>
                                <Input
                                    required
                                    className="bg-gray-700/50 border-gray-600 text-white"
                                    placeholder="Enter competition title"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-200">Description</Label>
                                <Textarea
                                    required
                                    className="bg-gray-700/50 border-gray-600 text-white min-h-[100px]"
                                    placeholder="Describe your competition"
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-gray-200">Prize Pool</Label>
                                    <div className="relative">
                                        <Trophy className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            required
                                            className="pl-10 bg-gray-700/50 border-gray-600 text-white"
                                            placeholder="e.g., 50,000 TAO"
                                            value={formData.prize}
                                            onChange={(e) => setFormData(prev => ({ ...prev, prize: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-gray-200">Difficulty Level</Label>
                                    <Select
                                        onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}
                                    >
                                        <SelectTrigger className="bg-gray-700/50 border-gray-600 text-white">
                                            <SelectValue placeholder="Select difficulty" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="beginner">Beginner</SelectItem>
                                            <SelectItem value="intermediate">Intermediate</SelectItem>
                                            <SelectItem value="advanced">Advanced</SelectItem>
                                            <SelectItem value="expert">Expert</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-gray-200">Start Date</Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            type="date"
                                            required
                                            className="pl-10 bg-gray-700/50 border-gray-600 text-white"
                                            value={formData.startDate}
                                            onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-gray-200">End Date</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                        <Input
                                            type="date"
                                            required
                                            className="pl-10 bg-gray-700/50 border-gray-600 text-white"
                                            value={formData.endDate}
                                            onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-200">Dataset Description</Label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Textarea
                                        required
                                        className="pl-10 bg-gray-700/50 border-gray-600 text-white min-h-[100px]"
                                        placeholder="Describe the dataset and any relevant information"
                                        value={formData.datasetDescription}
                                        onChange={(e) => setFormData(prev => ({ ...prev, datasetDescription: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-200">Evaluation Metric</Label>
                                <div className="relative">
                                    <Target className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                                    <Input
                                        required
                                        className="pl-10 bg-gray-700/50 border-gray-600 text-white"
                                        placeholder="e.g., Mean Squared Error, Accuracy"
                                        value={formData.evaluationMetric}
                                        onChange={(e) => setFormData(prev => ({ ...prev, evaluationMetric: e.target.value }))}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-200">Submission Format</Label>
                                <Textarea
                                    required
                                    className="bg-gray-700/50 border-gray-600 text-white min-h-[100px]"
                                    placeholder="Describe the expected format of submissions"
                                    value={formData.submissionFormat}
                                    onChange={(e) => setFormData(prev => ({ ...prev, submissionFormat: e.target.value }))}
                                />
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-200">Rules</Label>
                                <Textarea
                                    required
                                    className="bg-gray-700/50 border-gray-600 text-white min-h-[100px]"
                                    placeholder="Enter competition rules (one per line)"
                                    value={formData.rules}
                                    onChange={(e) => setFormData(prev => ({ ...prev, rules: e.target.value }))}
                                />
                            </div>

                            {error && (
                                <Alert variant="destructive" className="bg-red-900/20 border-red-900">
                                    <AlertDescription>{error}</AlertDescription>
                                </Alert>
                            )}

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
                            >
                                {loading ? 'Creating...' : 'Create Competition'}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default CreateCompetitionForm;