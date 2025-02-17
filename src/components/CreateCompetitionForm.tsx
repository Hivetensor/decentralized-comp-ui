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
import {api} from '@/services/api';
import {toast} from "@/hooks/use-toast";
import {useAuth} from '@/contexts/AuthContext';

const competitionSchema = z.object({
    title: z.string()
        .min(5, "Title must be at least 5 characters")
        .max(255, "Title must be less than 255 characters"),
    description: z.string()
        .min(20, "Description must be at least 20 characters")
        .max(5000, "Description too long"),
    prize: z.string()
        .min(1, "Prize amount is required"),
    prize_currency: z.string()
        .min(1, "Prize currency is required"),
    difficulty: z.enum(["Beginner", "Intermediate", "Advanced", "Expert"], {
        required_error: "Please select a difficulty level"
    }),
    startDate: z.string()
        .refine(date => new Date(date) > new Date(), "Start date must be in the future"),
    deadline: z.string()
        .refine(date => new Date(date) > new Date(), "End date must be in the future"),
    datasetDescription: z.string()
        .min(20, "Dataset description must be at least 20 characters"),
    evaluationMetric: z.string()
        .min(5, "Please provide evaluation metric"),
    submissionFormat: z.string()
        .min(20, "Please provide detailed submission format"),
    tags: z.array(z.string()),
    rules: z.array(z.string()),
    requires_submission: z.boolean(),
    has_external_wallet: z.boolean(),
    wallet_address: z.string().optional()
        .refine(value => !value || value.length > 0, "Wallet address is required when external wallet is enabled"),
});

const CreateCompetitionForm = () => {
    const {user} = useAuth();
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [datasetFile, setDatasetFile] = useState<File | null>(null);
    const [fileError, setFileError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        prize: '',
        prize_currency: 'TAO',
        difficulty: '',
        startDate: '',
        deadline: '',
        datasetDescription: '',
        evaluationMetric: '',
        submissionFormat: '',
        tags: [] as string[],
        rules: [] as string[],
        requires_submission: false,
        has_external_wallet: false,
        wallet_address: '',
    });

    const validateFile = (file: File) => {
        if (file.size > 100 * 1024 * 1024) { // 100MB
            return "File size must be less than 100MB";
        }
        return null;
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const error = validateFile(file);
            setFileError(error);
            if (!error) {
                setDatasetFile(file);
            }
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm() || !datasetFile) return;
        if (fileError) return;

        setLoading(true);
        setError(null);

        try {
            if (!user || user.type !== 'host' || !user.data.id) {
                throw new Error('Host ID not found');
            }
            const hostId = user.data.id;

            const form = new FormData();

            // Use state values to populate FormData
            form.append('title', formData.title);
            form.append('description', formData.description);
            form.append('prize', formData.prize);
            form.append('prize_currency', formData.prize_currency);
            form.append('difficulty', formData.difficulty);
            form.append('start_date', formData.startDate);
            form.append('deadline', formData.deadline);
            form.append('dataset_description', formData.datasetDescription);
            form.append('evaluation_metric', formData.evaluationMetric);
            form.append('submission_format', formData.submissionFormat);
            form.append('status', 'Upcoming');
            form.append('requires_submission', String(formData.requires_submission));
            form.append('has_external_wallet', String(formData.has_external_wallet));
            if (formData.has_external_wallet && formData.wallet_address) {
                form.append('wallet_address', formData.wallet_address);
            }

            // Handle arrays
            formData.tags.forEach(tag => {
                form.append('tags', tag);
            });

            formData.rules.forEach(rule => {
                form.append('rules', rule);
            });

            // Add the file
            form.append('dataset_file', datasetFile);

            await api.hosts.createCompetition(hostId, form);

            toast({
                title: "Competition Created",
                description: "Your competition has been created successfully",
                variant: "success",
            });

            router.push('/host/dashboard');
        } catch (err) {
            setError('Failed to create competition. Please try again.');
        } finally {
            setLoading(false);
        }
    };

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
                                    <Label className="text-gray-200">Prize Amount</Label>
                                    <div className="relative">
                                        <Trophy className="absolute left-3 top-3 h-4 w-4 text-gray-400"/>
                                        <Input
                                            required
                                            className={`pl-10 bg-gray-700/50 border-gray-600 text-white ${
                                                errors.prize ? 'border-red-500' : ''
                                            }`}
                                            placeholder="e.g., 50000"
                                            value={formData.prize}
                                            onChange={(e) => setFormData(prev => ({...prev, prize: e.target.value}))}
                                        />
                                        {errors.prize && (
                                            <p className="text-red-400 text-sm mt-1">{errors.prize}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label className="text-gray-200">Prize Currency</Label>
                                    <Input
                                        required
                                        className={`bg-gray-700/50 border-gray-600 text-white ${
                                            errors.prize_currency ? 'border-red-500' : ''
                                        }`}
                                        placeholder="e.g., TAO, BTC"
                                        value={formData.prize_currency}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            prize_currency: e.target.value
                                        }))}
                                    />
                                    {errors.prize_currency && (
                                        <p className="text-red-400 text-sm mt-1">{errors.prize_currency}</p>
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
                                        <SelectItem value="Beginner">Beginner</SelectItem>
                                        <SelectItem value="Intermediate">Intermediate</SelectItem>
                                        <SelectItem value="Advanced">Advanced</SelectItem>
                                        <SelectItem value="Expert">Expert</SelectItem>
                                    </SelectContent>
                                </Select>
                                {errors.difficulty && (
                                    <p className="text-red-400 text-sm mt-1">{errors.difficulty}</p>
                                )}
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
                                                errors.deadline ? 'border-red-500' : ''
                                            }`}
                                            value={formData.deadline}
                                            onChange={(e) => setFormData(prev => ({...prev, deadline: e.target.value}))}
                                        />
                                        {errors.deadline && (
                                            <p className="text-red-400 text-sm mt-1">{errors.deadline}</p>
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
                                <Label className="text-gray-200">Dataset File</Label>
                                <div className="relative">
                                    <Input
                                        type="file"
                                        required
                                        className={`bg-gray-700/50 border-gray-600 text-white ${
                                            fileError ? 'border-red-500' : ''
                                        }`}
                                        onChange={handleFileChange}
                                        accept=".csv,.xls,.xlsx,.zip"
                                    />
                                    {fileError && (
                                        <p className="text-red-400 text-sm mt-1">{fileError}</p>
                                    )}
                                </div>
                                {datasetFile && (
                                    <p className="text-sm text-gray-400">
                                        Selected
                                        file: {datasetFile.name} ({(datasetFile.size / (1024 * 1024)).toFixed(2)}MB)
                                    </p>
                                )}
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

                            <div className="flex items-center gap-4 my-4">
                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="requires_submission"
                                        className="mr-2"
                                        checked={formData.requires_submission}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            requires_submission: e.target.checked
                                        }))}
                                    />
                                    <Label htmlFor="requires_submission" className="text-gray-200">
                                        Requires HuggingFace Submission
                                    </Label>
                                </div>

                                <div className="flex items-center">
                                    <input
                                        type="checkbox"
                                        id="has_external_wallet"
                                        className="mr-2"
                                        checked={formData.has_external_wallet}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            has_external_wallet: e.target.checked
                                        }))}
                                    />
                                    <Label htmlFor="has_external_wallet" className="text-gray-200">
                                        Accept External Contributions
                                    </Label>
                                </div>
                            </div>

                            {formData.has_external_wallet && (
                                <div className="space-y-2">
                                    <Label className="text-gray-200">Wallet Address</Label>
                                    <Input
                                        required
                                        className="bg-gray-700/50 border-gray-600 text-white"
                                        placeholder="Enter wallet address for contributions"
                                        value={formData.wallet_address}
                                        onChange={(e) => setFormData(prev => ({
                                            ...prev,
                                            wallet_address: e.target.value
                                        }))}
                                    />
                                    {errors.wallet_address && (
                                        <p className="text-red-400 text-sm mt-1">{errors.wallet_address}</p>
                                    )}
                                </div>
                            )}

                            {/* Tags Input */}
                            <div className="space-y-2">
                                <Label className="text-gray-200">Tags</Label>
                                <Textarea
                                    required
                                    className={`bg-gray-700/50 border-gray-600 text-white min-h-[100px] ${
                                        errors.tags ? 'border-red-500' : ''
                                    }`}
                                    placeholder="Enter tags (one per line)"
                                    value={formData.tags.join('\n')}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        tags: e.target.value.split('\n').filter(tag => tag.trim() !== '')
                                    }))}
                                />
                                {errors.tags && (
                                    <p className="text-red-400 text-sm mt-1">{errors.tags}</p>
                                )}
                            </div>

                            {/* Rules Input */}
                            <div className="space-y-2">
                                <Label className="text-gray-200">Rules</Label>
                                <Textarea
                                    required
                                    className={`bg-gray-700/50 border-gray-600 text-white min-h-[100px] ${
                                        errors.rules ? 'border-red-500' : ''
                                    }`}
                                    placeholder="Enter competition rules (one per line)"
                                    value={formData.rules.join('\n')}
                                    onChange={(e) => setFormData(prev => ({
                                        ...prev,
                                        rules: e.target.value.split('\n').filter(rule => rule.trim() !== '')
                                    }))}
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