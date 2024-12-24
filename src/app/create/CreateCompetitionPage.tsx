'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertCircle, Plus, Loader2, X } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { api } from '@/api';
import { toast } from "@/hooks/use-toast";

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
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    
    // const startDate = new Date(formData.startDate);
    // const deadline = new Date(formData.deadline);
    // if (startDate >= deadline) {
    //   errors.push('Start date must be before deadline');
    // }
    
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
      

      // Redirect to the new competition's page
      router.push(`/competitions/${newCompetition.id}`);

      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to create competition');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-8">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Create Competition
          </h1>
          <p className="text-gray-300">Launch your own AI challenge and inspire innovation</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-6">
        {error && (
          <Alert variant="destructive" className="mb-6 bg-red-900/20 border-red-900">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Competition Title
                </label>
                <input
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="Enter competition title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full min-h-32 p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
                  placeholder="Describe your competition"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Prize Pool
                  </label>
                  <input
                    type="text"
                    name="prize"
                    value={formData.prize}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="e.g., 50,000 USDC"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Difficulty Level
                  </label>
                  <Select 
                    value={formData.difficulty}
                    onValueChange={(value) => setFormData(prev => ({ ...prev, difficulty: value }))}
                  >
                    <SelectTrigger className="bg-gray-800 border-gray-700">
                      <SelectValue placeholder="Select difficulty" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Beginner">Beginner</SelectItem>
                      <SelectItem value="Intermediate">Intermediate</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                      <SelectItem value="Expert">Expert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-1">
                    Duration
                  </label>
                  <input
                    type="text"
                    name="startDate"
                    value={formData.startDate}
                    onChange={handleInputChange}
                    className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    required
                  />
                </div>

                
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Tags
                </label>
                <div className="flex gap-2 mb-2 flex-wrap">
                  {tags.map(tag => (
                    <Badge 
                      key={tag}
                      variant="secondary" 
                      className="bg-purple-900/20 flex items-center gap-1"
                    >
                      {tag}
                      <X
                        className="h-3 w-3 cursor-pointer"
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
                    className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Add a tag"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                  />
                  <Button
                    type="button"
                    onClick={handleAddTag}
                    variant="secondary"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle>Competition Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Dataset Description
                </label>
                <textarea
                  name="datasetDescription"
                  value={formData.datasetDescription}
                  onChange={handleInputChange}
                  className="w-full min-h-32 p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
                  placeholder="Describe the dataset and any relevant information"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Evaluation Metric
                </label>
                <input
                  name="evaluationMetric"
                  value={formData.evaluationMetric}
                  onChange={handleInputChange}
                  className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  placeholder="e.g., Mean Squared Error, Accuracy"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Submission Format
                </label>
                <textarea
                  name="submissionFormat"
                  value={formData.submissionFormat}
                  onChange={handleInputChange}
                  className="w-full min-h-32 p-2 rounded-md bg-gray-800 border border-gray-700 text-white"
                  placeholder="Describe the expected format of submissions"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400 mb-1">
                  Rules
                </label>
                <div className="space-y-2 mb-2">
                  {rules.map((rule, index) => (
                    <div key={index} className="flex items-center gap-2 bg-gray-800 p-2 rounded">
                      <span className="flex-1 text-gray-300">{rule}</span>
                      <X
                        className="h-4 w-4 cursor-pointer text-gray-400 hover:text-white"
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
                    className="flex h-10 w-full rounded-md border border-gray-700 bg-gray-800 px-3 py-2 text-sm text-white ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="Add a rule"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddRule())}
                  />
                  <Button
                    type="button"
                    onClick={handleAddRule}
                    variant="secondary"
                    className="bg-purple-600 hover:bg-purple-700"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
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