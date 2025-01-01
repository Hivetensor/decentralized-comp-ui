import React from 'react';
import { Badge } from "@/components/ui/badge";
import Link from 'next/link'; // Add this import at the top

// Sample data - in real app, this would come from your API/database
const featuredCompetitions = [
  {
    id: 1,
    title: "Neural Network Challenge 2024",
    prize: "50,000 USDC",
    participants: 1234,
    deadline: "5 days left",
    difficulty: "Advanced",
    tags: ["AI", "Deep Learning"]
  },
  {
    id: 2,
    title: "Quantum Computing Optimization",
    prize: "25,000 USDC",
    participants: 856,
    deadline: "12 days left",
    difficulty: "Expert",
    tags: ["Quantum", "Optimization"]
  },
  {
    id: 3,
    title: "Blockchain Data Analysis",
    prize: "30,000 USDC",
    participants: 567,
    deadline: "8 days left",
    difficulty: "Intermediate",
    tags: ["Blockchain", "Analytics"]
  }
];

const HomePage = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/50 to-cyan-900/50" />
        <div className="relative px-6 py-24 mx-auto max-w-7xl">
          <div className="text-center">
            <h1 className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400 mb-6">
              Decode the Future
            </h1>
            <p className="text-xl text-gray-300 mb-8">
              Compete. Create. Conquer. Welcome to the next generation of data science competitions.
            </p>
            <div className="flex justify-center gap-4">
              <Link href="/competitions">
                <Badge className="px-4 py-2 text-lg bg-purple-600 hover:bg-purple-700">
                  Browse Competitions
                </Badge>
              </Link>
              <Badge className="px-4 py-2 text-lg bg-cyan-600 hover:bg-cyan-700">
                Learn More
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;