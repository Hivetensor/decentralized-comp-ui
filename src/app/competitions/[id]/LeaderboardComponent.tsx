'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { LeaderboardEntry } from '@/types';

interface LeaderboardComponentProps {
  leaderboardData: LeaderboardEntry[];
}

const LeaderboardComponent: React.FC<LeaderboardComponentProps> = ({ leaderboardData }) => {
  const colors = [
    '#ff0099', '#00ff99', '#9900ff', '#ff9900', '#00ffff',
    '#ff00ff', '#99ff00', '#0099ff', '#ffff00', '#ff0000'
  ];

  const chartData = leaderboardData[0]?.performance.map((_, index) => {
    const point: any = { iteration: `Iteration ${index + 1}` };
    leaderboardData.forEach(entry => {
      point[entry.team] = entry.performance[index];
    });
    return point;
  });

  return (
    <div className="space-y-8">
      {/* SOTA Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Current Leaderboard
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="p-4 text-left text-gray-400">Rank</th>
                  <th className="p-4 text-left text-gray-400">Team</th>
                  <th className="p-4 text-left text-gray-400">Score</th>
                  <th className="p-4 text-left text-gray-400">Submissions</th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData.map((entry) => (
                  <tr key={entry.team} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="p-4">
                      <Badge variant="outline" className="bg-purple-900/20">
                        #{entry.rank}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-300">{entry.team}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-cyan-400">{entry.score.toFixed(4)}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-purple-400">{entry.submissions}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Performance Chart */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Performance Over Time
          </CardTitle>
          <p className="text-gray-400">Training progress across iterations</p>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="iteration" 
                  stroke="#666"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#666"
                  style={{ fontSize: '12px' }}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #333',
                    borderRadius: '4px'
                  }}
                />
                <Legend />
                {leaderboardData.map((entry, index) => (
                  <Line
                    key={entry.team}
                    type="monotone"
                    dataKey={entry.team}
                    stroke={colors[index % colors.length]}
                    dot={false}
                    strokeWidth={2}
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LeaderboardComponent;