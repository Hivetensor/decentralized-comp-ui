'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Trophy, Users, Timer, Zap, ChartBar, FileText, MessageSquare } from 'lucide-react';
import LeaderboardComponent from './LeaderboardComponent';

// Sample competition data
const competitionData = {
  id: 1,
  title: "Neural Network Challenge 2024",
  description: "Build a neural network that can predict quantum states with unprecedented accuracy. This competition challenges participants to develop innovative approaches to quantum state prediction using advanced neural network architectures.",
  prize: "50,000 USDC",
  participants: 1234,
  deadline: "5 days left",
  difficulty: "Advanced",
  status: "Active",
  tags: ["AI", "Deep Learning", "Quantum Computing"],
  rules: [
    "Submissions must be made before the deadline",
    "Maximum of 5 submissions per day",
    "Final solutions must include documentation",
    "Code must be original and properly licensed",
  ],
  timeline: [
    { date: "Jan 1, 2024", event: "Competition Start" },
    { date: "Feb 1, 2024", event: "First Benchmark Release" },
    { date: "Mar 1, 2024", event: "Final Submission Deadline" },
    { date: "Mar 15, 2024", event: "Winners Announced" },
  ],
  leaderboard: [
    { rank: 1, team: "QuantumMinds", score: 0.9856, submissions: 12 },
    { rank: 2, team: "DeepQuantum", score: 0.9845, submissions: 15 },
    { rank: 3, team: "NeuralNet Pro", score: 0.9832, submissions: 8 },
  ]
};

const CompetitionDetail = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-4 mb-4">
            {competitionData.tags.map((tag) => (
              <Badge key={tag} className="bg-gray-800 text-gray-300">
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className="text-4xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            {competitionData.title}
          </h1>
          <p className="text-gray-300 max-w-3xl">{competitionData.description}</p>
        </div>
      </div>

      {/* Competition Info */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 flex items-center gap-3">
              <Trophy className="w-6 h-6 text-yellow-500" />
              <div>
                <p className="text-sm text-gray-400">Prize Pool</p>
                <p className="text-lg font-bold text-yellow-500">{competitionData.prize}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 flex items-center gap-3">
              <Users className="w-6 h-6 text-blue-400" />
              <div>
                <p className="text-sm text-gray-400">Participants</p>
                <p className="text-lg font-bold text-blue-400">{competitionData.participants}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 flex items-center gap-3">
              <Timer className="w-6 h-6 text-red-400" />
              <div>
                <p className="text-sm text-gray-400">Time Remaining</p>
                <p className="text-lg font-bold text-red-400">{competitionData.deadline}</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-4 flex items-center gap-3">
              <Zap className="w-6 h-6 text-green-400" />
              <div>
                <p className="text-sm text-gray-400">Difficulty</p>
                <p className="text-lg font-bold text-green-400">{competitionData.difficulty}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs Section */}
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="bg-gray-900 border-gray-800">
            <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">Overview</TabsTrigger>
            <TabsTrigger value="rules" className="data-[state=active]:bg-purple-600">Rules</TabsTrigger>
            <TabsTrigger value="timeline" className="data-[state=active]:bg-purple-600">Timeline</TabsTrigger>
            <TabsTrigger value="leaderboard" className="data-[state=active]:bg-purple-600">Leaderboard</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Competition Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{competitionData.description}</p>
                {/* Add more overview content here */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="rules" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Competition Rules</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {competitionData.rules.map((rule, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <div className="w-2 h-2 bg-purple-500 rounded-full" />
                      <span className="text-gray-300">{rule}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="timeline" className="mt-6">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle>Competition Timeline</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {competitionData.timeline.map((event, index) => (
                    <div key={index} className="flex items-center gap-4">
                      <div className="w-2 h-2 bg-cyan-500 rounded-full" />
                      <div className="flex-1">
                        <p className="text-gray-300">{event.event}</p>
                        <p className="text-sm text-gray-500">{event.date}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="leaderboard" className="mt-6">
            <LeaderboardComponent />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default CompetitionDetail;