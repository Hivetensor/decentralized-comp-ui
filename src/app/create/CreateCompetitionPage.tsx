'use client';

import React, {useState} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Button} from "@/components/ui/button";
import {Badge} from "@/components/ui/badge";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {AlertCircle, Loader2, Plus, X} from 'lucide-react';
import {useRouter} from 'next/navigation';
import {api} from '@/api';
import {toast} from "@/hooks/use-toast";

const CreateCompetitionPage = () => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [tags, setTags] = useState<string[]>([]);
    const [currentTag, setCurrentTag] = useState('');
    const [rules, setRules] = useState<string[]>([]);
    const [currentRule, setCurrentRule] = useState('');

    const router = useRouter();

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        prize: '',
        difficulty: '',
        startDate: '',
        datasetDescription: '',
        evaluationMetric: '',
        submissionFormat: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleAddTag = () => {
        if (currentTag.trim() && !tags.includes(currentTag.trim())) {
            setTags(prev => [...prev, currentTag.trim()]);
            setCurrentTag('');
        }
    };

    const handleRemoveTag = (tagToRemove: string) => {
        setTags(prev => prev.filter(tag => tag !== tagToRemove));
    };

    const handleAddRule = () => {
        if (currentRule.trim()) {
            setRules(prev => [...prev, currentRule.trim()]);
            setCurrentRule('');
        }
    };

    const handleRemoveRule = (ruleToRemove: string) => {
        setRules(prev => prev.filter(rule => rule !== ruleToRemove));
    };

    const validateForm = () => {
        const errors = [];
        if (!formData.title.trim()) errors.push('Title is required');
        if (!formData.description.trim()) errors.push('Description is required');
        if (!formData.prize.trim()) errors.push('Prize is required');
        if (!formData.difficulty) errors.push('Difficulty is required');
        return errors;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const validationErrors = validateForm();
        if (validationErrors.length > 0) {
            setError(validationErrors.join(', '));
            return;
        }
        setLoading(true);
        setError(null);

        try {
            const newCompetition = await api.competitions.createCompetition({
                ...formData,
                tags,
                rules
            });

            toast({
                title: "Competition Created",
                description: "Your competition has been successfully created.",
            });

            router.push(`/competitions/${newCompetition.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to create competition');
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-950 text-white">
            {/* Header Section with improved contrast */}
            <div className="bg-gradient-to-r from-purple-900 to-cyan-900 p-8 shadow-lg">
                <div className="max-w-7xl mx-auto">
                    <h1 className="text-4xl font-bold mb-4 text-white">
                        Create Competition
                    </h1>
                    <p className="text-gray-100 text-lg font-medium">
                        Launch your own AI challenge and inspire innovation
                    </p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto p-6">
                {error && (
                    <Alert variant="destructive" className="mb-6 bg-red-950 border-red-900">
                        <AlertCircle className="h-4 w-4"/>
                        <AlertDescription className="text-white font-medium">{error}</AlertDescription>
                    </Alert>
                )}

                <form onSubmit={handleSubmit} className="space-y-8">
                    <Card className="bg-gray-900 border-gray-800 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl text-white font-bold">Basic Information</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <label className="block text-base font-semibold text-gray-100 mb-2">
                                    Competition Title
                                </label>
                                <input
                                    name="title"
                                    value={formData.title}
                                    onChange={handleInputChange}
                                    className="flex h-12 w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-base text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                    placeholder="Enter competition title"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-gray-100 mb-2">
                                    Description
                                </label>
                                <textarea
                                    name="description"
                                    value={formData.description}
                                    onChange={handleInputChange}
                                    className="w-full min-h-32 rounded-md bg-gray-800 border border-gray-700 p-4 text-base text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                    placeholder="Describe your competition"
                                    required
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-base font-semibold text-gray-100 mb-2">
                                        Prize Pool
                                    </label>
                                    <input
                                        type="text"
                                        name="prize"
                                        value={formData.prize}
                                        onChange={handleInputChange}
                                        className="flex h-12 w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-base text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                        placeholder="e.g., 50,000 USDC"
                                        required
                                    />
                                </div>

                                <div>
                                    <label className="block text-base font-semibold text-gray-100 mb-2">
                                        Difficulty Level
                                    </label>
                                    <Select
                                        value={formData.difficulty}
                                        onValueChange={(value) => setFormData(prev => ({...prev, difficulty: value}))}
                                    >
                                        <SelectTrigger className="h-12 bg-gray-800 border-gray-700 text-white">
                                            <SelectValue placeholder="Select difficulty"/>
                                        </SelectTrigger>
                                        <SelectContent className="bg-gray-800 border-gray-700">
                                            <SelectItem value="Beginner" className="text-white">Beginner</SelectItem>
                                            <SelectItem value="Intermediate"
                                                        className="text-white">Intermediate</SelectItem>
                                            <SelectItem value="Advanced" className="text-white">Advanced</SelectItem>
                                            <SelectItem value="Expert" className="text-white">Expert</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-gray-100 mb-2">
                                    Duration
                                </label>
                                <input
                                    type="text"
                                    name="startDate"
                                    value={formData.startDate}
                                    onChange={handleInputChange}
                                    className="flex h-12 w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-base text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                    placeholder="Enter competition duration"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-gray-100 mb-2">
                                    Tags
                                </label>
                                <div className="flex gap-2 mb-3 flex-wrap">
                                    {tags.map(tag => (
                                        <Badge
                                            key={tag}
                                            variant="secondary"
                                            className="bg-purple-900 text-white px-3 py-1 text-sm font-medium flex items-center gap-2"
                                        >
                                            {tag}
                                            <X
                                                className="h-3 w-3 cursor-pointer hover:text-purple-200"
                                                onClick={() => handleRemoveTag(tag)}
                                            />
                                        </Badge>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={currentTag}
                                        onChange={(e) => setCurrentTag(e.target.value)}
                                        className="flex h-12 w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-base text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                        placeholder="Add a tag"
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                    />
                                    <Button
                                        type="button"
                                        onClick={handleAddTag}
                                        className="bg-purple-600 hover:bg-purple-700 text-white px-4"
                                    >
                                        <Plus className="h-5 w-5"/>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-gray-900 border-gray-800 shadow-lg">
                        <CardHeader>
                            <CardTitle className="text-xl text-white font-bold">Competition Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div>
                                <label className="block text-base font-semibold text-gray-100 mb-2">
                                    Dataset Description
                                </label>
                                <textarea
                                    name="datasetDescription"
                                    value={formData.datasetDescription}
                                    onChange={handleInputChange}
                                    className="w-full min-h-32 rounded-md bg-gray-800 border border-gray-700 p-4 text-base text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                    placeholder="Describe the dataset and any relevant information"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-gray-100 mb-2">
                                    Evaluation Metric
                                </label>
                                <input
                                    name="evaluationMetric"
                                    value={formData.evaluationMetric}
                                    onChange={handleInputChange}
                                    className="flex h-12 w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-base text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                    placeholder="e.g., Mean Squared Error, Accuracy"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-gray-100 mb-2">
                                    Submission Format
                                </label>
                                <textarea
                                    name="submissionFormat"
                                    value={formData.submissionFormat}
                                    onChange={handleInputChange}
                                    className="w-full min-h-32 rounded-md bg-gray-800 border border-gray-700 p-4 text-base text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                    placeholder="Describe the expected format of submissions"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-base font-semibold text-gray-100 mb-2">
                                    Rules
                                </label>
                                <div className="space-y-3 mb-3">
                                    {rules.map((rule, index) => (
                                        <div key={index}
                                             className="flex items-center gap-3 bg-gray-800 p-3 rounded-md border border-gray-700">
                                            <span className="flex-1 text-white text-base">{rule}</span>
                                            <X
                                                className="h-5 w-5 cursor-pointer text-gray-400 hover:text-white"
                                                onClick={() => handleRemoveRule(rule)}
                                            />
                                        </div>
                                    ))}
                                </div>
                                <div className="flex gap-2">
                                    <input
                                        type="text"
                                        value={currentRule}
                                        onChange={(e) => setCurrentRule(e.target.value)}
                                        className="flex h-12 w-full rounded-md border border-gray-700 bg-gray-800 px-4 py-2 text-base text-white placeholder:text-gray-400 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
                                        placeholder="Add a rule"
                                        onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRule())}
                                    />
                                    <Button
                                        type="button"
                                        onClick={handleAddRule}
                                        className="bg-purple-600 hover:bg-purple-700 text-white px-4"
                                    >
                                        <Plus className="h-5 w-5"/>
                                    </Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Button
                        type="submit"
                        className="w-full h-12 text-lg font-semibold bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white"
                        disabled={loading}
                    >
                        {loading ? (
                            <>
                                <Loader2 className="mr-2 h-5 w-5 animate-spin"/>
                                Creating Competition...
                            </>
                        ) : (
                            'Create Competition'
                        )}
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default CreateCompetitionPage;