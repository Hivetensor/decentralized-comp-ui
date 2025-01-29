'use client';

import React, {useState} from 'react';
import {useRouter} from 'next/navigation';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import {Label} from "@/components/ui/label";
import {Textarea} from "@/components/ui/textarea";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import {Calendar, Clock, FileText, Target, Trophy} from 'lucide-react';
import {z} from "zod";

const competitionSchema = z.object({
    title: z.string()
        .min(5, "Title must be at least 5 characters")
        .max(255, "Title must be less than 255 characters"),
    description: z.string()
        .min(20, "Description must be at least 20 characters")
        .max(5000, "Description too long"),
    prize: z.string()
        .regex(/^\d+(\.\d+)?\s*TAO$/, "Prize must be a number followed by TAO"),
    difficulty: z.enum(["beginner", "intermediate", "advanced", "expert"], {
        required_error: "Please select a difficulty level"
    }),
    startDate: z.string()
        .refine(date => new Date(date) > new Date(), "Start date must be in the future"),
    endDate: z.string()
        .refine(date => new Date(date) > new Date(), "End date must be in the future"),
    datasetDescription: z.string()
        .min(20, "Dataset description must be at least 20 characters"),
    evaluationMetric: z.string()
        .min(5, "Please provide evaluation metric"),
    submissionFormat: z.string()
        .min(20, "Please provide detailed submission format"),
    rules: z.string()
        .min(20, "Please provide competition rules")
}).refine(data => new Date(data.endDate) > new Date(data.startDate), {
    message: "End date must be after start date",
    path: ["endDate"]
});

const CreateCompetitionForm = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

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

    const validateForm = () => {
        try {
            competitionSchema.parse(formData);
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

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        setLoading(true);
        setError(null);

        try {
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
                                    className={`bg-gray-700/50 border-gray-600 text-white ${
                                        errors.title ? 'border-red-500' : ''
                                    }`}
                                    placeholder="Enter competition title"
                                    value={formData.title}
                                    onChange={(e) => setFormData(prev => ({...prev, title: e.target.value}))}
                                />
                                {errors.title && (
                                    <p className="text-red-400 text-sm mt-1">{errors.title}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-200">Description</Label>
                                <Textarea
                                    required
                                    className={`bg-gray-700/50 border-gray-600 text-white min-h-[100px] ${
                                        errors.description ? 'border-red-500' : ''
                                    }`}
                                    placeholder="Describe your competition"
                                    value={formData.description}
                                    onChange={(e) => setFormData(prev => ({...prev, description: e.target.value}))}
                                />
                                {errors.description && (
                                    <p className="text-red-400 text-sm mt-1">{errors.description}</p>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-gray-200">Prize Pool</Label>
                                    <div className="relative">
                                        <Trophy className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                                        <Input
                                            required
                                            className={`pl-10 bg-gray-700/50 border-gray-600 text-white ${
                                                errors.prize ? 'border-red-500' : ''
                                            }`}
                                            placeholder="e.g., 50000 TAO"
                                            value={formData.prize}
                                            onChange={(e) => setFormData(prev => ({...prev, prize: e.target.value}))}
                                        />
                                        {errors.prize && (
                                            <p className="text-red-400 text-sm mt-1">{errors.prize}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-gray-200">Difficulty Level</Label>
                                    <Select
                                        value={formData.difficulty}
                                        onValueChange={(value) => setFormData(prev => ({...prev, difficulty: value}))}
                                    >
                                        <SelectTrigger className={`bg-gray-700/50 border-gray-600 text-white ${
                                            errors.difficulty ? 'border-red-500' : ''
                                        }`}>
                                            <SelectValue placeholder="Select difficulty"/>
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="beginner">Beginner</SelectItem>
                                            <SelectItem value="intermediate">Intermediate</SelectItem>
                                            <SelectItem value="advanced">Advanced</SelectItem>
                                            <SelectItem value="expert">Expert</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    {errors.difficulty && (
                                        <p className="text-red-400 text-sm mt-1">{errors.difficulty}</p>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-gray-200">Start Date</Label>
                                    <div className="relative">
                                        <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                                        <Input
                                            type="date"
                                            required
                                            className={`pl-10 bg-gray-700/50 border-gray-600 text-white ${
                                                errors.startDate ? 'border-red-500' : ''
                                            }`}
                                            value={formData.startDate}
                                            onChange={(e) => setFormData(prev => ({
                                                ...prev,
                                                startDate: e.target.value
                                            }))}
                                        />
                                        {errors.startDate && (
                                            <p className="text-red-400 text-sm mt-1">{errors.startDate}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-gray-200">End Date</Label>
                                    <div className="relative">
                                        <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                                        <Input
                                            type="date"
                                            required
                                            className={`pl-10 bg-gray-700/50 border-gray-600 text-white ${
                                                errors.endDate ? 'border-red-500' : ''
                                            }`}
                                            value={formData.endDate}
                                            onChange={(e) => setFormData(prev => ({...prev, endDate: e.target.value}))}
                                        />
                                        {errors.endDate && (
                                            <p className="text-red-400 text-sm mt-1">{errors.endDate}</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-200">Dataset Description</Label>
                                <div className="relative">
                                    <FileText className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                                    <Textarea
                                        required
                                        className={`pl-10 bg-gray-700/50 border-gray-600 text-white min-h-[100px] ${
                                            errors.datasetDescription ? 'border-red-500' : ''
                                        }`}
                                        placeholder="Describe the dataset and any relevant information"
                                        value={formData.datasetDescription}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            datasetDescription: e.target.value
                                        }))}
                                    />
                                    {errors.datasetDescription && (
                                        <p className="text-red-400 text-sm mt-1">{errors.datasetDescription}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-200">Evaluation Metric</Label>
                                <div className="relative">
                                    <Target className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                                    <Input
                                        required
                                        className={`pl-10 bg-gray-700/50 border-gray-600 text-white ${
                                            errors.evaluationMetric ? 'border-red-500' : ''
                                        }`}
                                        placeholder="e.g., Mean Squared Error, Accuracy"
                                        value={formData.evaluationMetric}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            evaluationMetric: e.target.value
                                        }))}
                                    />
                                    {errors.evaluationMetric && (
                                        <p className="text-red-400 text-sm mt-1">{errors.evaluationMetric}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-200">Submission Format</Label>
                                <Textarea
                                    required
                                    className={`bg-gray-700/50 border-gray-600 text-white min-h-[100px] ${
                                        errors.submissionFormat ? 'border-red-500' : ''
                                    }`}
                                    placeholder="Describe the expected format of submissions"
                                    value={formData.submissionFormat}
                                    onChange={(e) => setFormData(prev => ({...prev, submissionFormat: e.target.value}))}
                                />
                                {errors.submissionFormat && (
                                    <p className="text-red-400 text-sm mt-1">{errors.submissionFormat}</p>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-gray-200">Rules</Label>
                                <Textarea
                                    required
                                    className={`bg-gray-700/50 border-gray-600 text-white min-h-[100px] ${
                                        errors.rules ? 'border-red-500' : ''
                                    }`}
                                    placeholder="Enter competition rules (one per line)"
                                    value={formData.rules}
                                    onChange={(e) => setFormData(prev => ({...prev, rules: e.target.value}))}
                                />
                                {errors.rules && (
                                    <p className="text-red-400 text-sm mt-1">{errors.rules}</p>
                                )}
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