'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Type definitions
interface SotaEntry {
  name: string;
  mnist_accuracy: number;
  cifar10_accuracy: number | null;
  training_time: number;
  complexity: string;
}

interface PerformanceEntry {
  name: string;
  values: number[];
}

interface LeaderboardData {
  lastUpdated: string;
  sota: SotaEntry[];
  performance: PerformanceEntry[];
}

const LeaderboardComponent = () => {
  // In a real app, this would come from an API
  const data: LeaderboardData = {
    "lastUpdated": "2024-12-02T17:46:34Z",
    "sota": [
      {
        "name": "11_generalElephant_sn49-2.json",
        "mnist_accuracy": 0.9,
        "cifar10_accuracy": null,
        "training_time": 0.0,
        "complexity": "High"
      },
      // ... other entries
    ],
    "performance": [
      {
        "name": "11_generalElephant_sn49-2.json",
        "values": [1.1, 1.09, 1.04, 1.01, 0.94, 0.92, 0.91, 0.91, 0.91]
      },
      // ... other entries
    ]
  };

  // Transform performance data for Recharts
  const chartData = data.performance[0].values.map((_, index) => {
    const point: any = { iteration: `Iteration ${index}` };
    data.performance.forEach(series => {
      point[series.name] = series.values[index];
    });
    return point;
  });

  // Cyberpunk color palette
  const colors = [
    '#ff0099', '#00ff99', '#9900ff', '#ff9900', '#00ffff',
    '#ff00ff', '#99ff00', '#0099ff', '#ffff00', '#ff0000'
  ];

  return (
    <div className="space-y-8">
      {/* SOTA Table */}
      <Card className="bg-gray-900 border-gray-800">
        <CardHeader>
          <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
            Current State of the Art
          </CardTitle>
          <p className="text-gray-400">Last updated: {new Date(data.lastUpdated).toLocaleString()}</p>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="p-4 text-left text-gray-400">Model</th>
                  <th className="p-4 text-left text-gray-400">MNIST Accuracy</th>
                  <th className="p-4 text-left text-gray-400">Training Time</th>
                  <th className="p-4 text-left text-gray-400">Complexity</th>
                </tr>
              </thead>
              <tbody>
                {data.sota.map((entry, index) => (
                  <tr key={entry.name} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="bg-purple-900/20">
                          #{index + 1}
                        </Badge>
                        <span className="text-gray-300">{entry.name}</span>
                      </div>
                    </td>
                    <td className="p-4">
                      <span className="text-cyan-400">{entry.mnist_accuracy.toFixed(3)}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-purple-400">{entry.training_time}x</span>
                    </td>
                    <td className="p-4">
                      <Badge variant="outline" className={
                        entry.complexity === 'High' 
                          ? 'bg-red-900/20 text-red-400'
                          : 'bg-green-900/20 text-green-400'
                      }>
                        {entry.complexity}
                      </Badge>
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
          <p className="text-gray-400">Validation Cross Entropy - 90 batches, eval every 10</p>
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
                {data.performance.map((series, index) => (
                  <Line
                    key={series.name}
                    type="monotone"
                    dataKey={series.name}
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