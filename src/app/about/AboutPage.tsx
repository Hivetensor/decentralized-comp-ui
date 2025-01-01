'use client';

import React from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Brain, Database, Lock, Cpu, Github, Twitter, Linkedin } from 'lucide-react';
import Image from 'next/image'

const AboutPage = () => {
  const teamMembers = [
    {
      name: "Dr. Kofi Osei-Obonsu",
      role: "ASI Prophet",
      bio: ".",
      image: "/api/placeholder/150/150",
      links: {
        // github: "https://github.com",
        // twitter: "https://twitter.com",
        // linkedin: "https://linkedin.com"
      }
    },
    {
      name: "Ali Hussein",
      role: "ASI Summoner",
      bio: ".",
      image: "/api/placeholder/150/150",
      links: {
        github: "https://github.com/mekaneeky",
        twitter: "https://twitter.com/GPLv6",
        linkedin: "https://linkedin.com/ali-hussein-ai"
      }
    },

  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-purple-900/50 to-cyan-900/50 p-8">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Revolutionizing AI Research
          </h1>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            We&apos;re building the first decentralized platform for AI research competitions, 
            powered by blockchain technology and cutting-edge infrastructure.
          </p>
        </div>
      </div>

      {/* Features Grid */}
      <div className="max-w-7xl mx-auto p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center">
              <Brain className="w-12 h-12 mx-auto mb-4 text-purple-400" />
              <h3 className="text-gray-400 text-xl font-bold mb-2">AI-First</h3>
              <p className="text-gray-400">
                Specialized infrastructure for machine learning competitions and research
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center">
              <Database className="w-12 h-12 mx-auto mb-4 text-cyan-400" />
              <h3 className="text-gray-400 text-xl font-bold mb-2">Decentralized</h3>
              <p className="text-gray-400">
                Built on Polkadot for transparent and verifiable competition results
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center">
              <Lock className="w-12 h-12 mx-auto mb-4 text-green-400" />
              <h3 className="text-gray-400 text-xl font-bold mb-2">Secure</h3>
              <p className="text-gray-400">
                End-to-end encryption and privacy-preserving computation
              </p>
            </CardContent>
          </Card>

          <Card className="bg-gray-900 border-gray-800">
            <CardContent className="p-6 text-center">
              <Cpu className="w-12 h-12 mx-auto mb-4 text-yellow-400" />
              <h3 className="text-gray-400 text-xl font-bold mb-2">Scalable</h3>
              <p className="text-gray-400">
                High-performance infrastructure for complex AI workloads
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Team Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Our Team
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <Card key={index} className="bg-gray-900 border-gray-800">
                <CardContent className="p-6 text-center">
                  <Image
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 bg-gray-800"
                  />
                  <h3 className="text-gray-400 text-xl font-bold mb-1">{member.name}</h3>
                  <Badge className="mb-3 bg-purple-900 text-purple-100">
                    {member.role}
                  </Badge>
                  <p className="text-gray-400 mb-4">
                    {member.bio}
                  </p>
                  <div className="flex justify-center gap-4">
                    {member.links.github && (
                      <a href={member.links.github} className="text-gray-400 hover:text-white">
                        <Github className="w-5 h-5" />
                      </a>
                    )}
                    {member.links.twitter && (
                      <a href={member.links.twitter} className="text-gray-400 hover:text-white">
                        <Twitter className="w-5 h-5" />
                      </a>
                    )}
                    {member.links.linkedin && (
                      <a href={member.links.linkedin} className="text-gray-400 hover:text-white">
                        <Linkedin className="w-5 h-5" />
                      </a>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;