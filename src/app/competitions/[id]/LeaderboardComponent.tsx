import React, { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import {maxBy, range, uniq} from 'lodash';

const LeaderboardComponent = ({ leaderboardData }:any) => {
  const colors = [
    '#ff0099', '#00ff99', '#9900ff', '#ff9900', '#00ffff',
    '#ff00ff', '#99ff00', '#0099ff', '#ffff00', '#ff0000'
  ];

  // Transform data into iterations format
  const timeSeriesData = useMemo(() => {
    if (!leaderboardData?.length) return [];
    
    console.log("First entry complete:", JSON.stringify(leaderboardData[0], null, 2));
    console.log("Type of scores:", typeof leaderboardData[0].scores);
    console.log("Is scores array?", Array.isArray(leaderboardData[0].scores));
    console.log("Scores value:", leaderboardData[0].scores);
        
    // Get the length of scores array from the first entry
    const numIterations = leaderboardData[0].scores?.length || 0;
    
    console.log("Number of iterations:", numIterations);
    
    if (numIterations === 0) return [];
    
    // @ts-ignore
    const iterations = range(numIterations).map(iteration => {
      const point = { iteration: `Iteration ${iteration}` };
      // @ts-ignore
      leaderboardData.forEach(entry => {
        const score = entry.scores?.[iteration];
        if (score !== undefined) {
          // @ts-ignore
          point[entry.team_name] = score;
        }
      });
      
      console.log(`Iteration ${iteration} point:`, point);  // Debug each point
      return point;
    });
    
    return iterations;
  }, [leaderboardData]);

  // Get final scores for leaderboard table
  const finalScores = useMemo(() => {
    // @ts-ignore
    const teams = uniq(leaderboardData.map(entry => entry.team_name));
    // @ts-ignore
    return teams.map(team => {
      // @ts-ignore
      const entries = leaderboardData.filter(entry => entry.team_name === team);
      const latestEntry = maxBy(entries, 'submission_date');
      return {
        team_name: team,
        score: latestEntry.score,
        submission_date: latestEntry.submission_date,
        rank: 0 // Will be calculated below
      };
    })// @ts-ignore
    .sort((a, b) => b.score - a.score)// @ts-ignore
    .map((entry, index) => ({ ...entry, rank: index + 1 }));
  }, [leaderboardData]);

  // Get unique team names for chart lines
  const teams = useMemo(() => // @ts-ignore
    Array.from(new Set(leaderboardData.map(entry => entry.team_name))),
    [leaderboardData]
  );

  return (
    <div className="space-y-8">
      {/* Leaderboard Table */}
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
                  <th className="p-4 text-left text-gray-400">Last Submission</th>
                </tr>
              </thead>
              <tbody> 
                {// @ts-ignore
                finalScores.map((entry) => (
                  <tr key={entry.team_name} className="border-b border-gray-800 hover:bg-gray-800/50">
                    <td className="p-4">
                      <Badge variant="outline" className="bg-purple-900/20">
                        #{entry.rank}
                      </Badge>
                    </td>
                    <td className="p-4">
                      <span className="text-gray-300">{entry.team_name}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-cyan-400">{entry.score.toFixed(2)}</span>
                    </td>
                    <td className="p-4">
                      <span className="text-purple-400">
                        {new Date(entry.submission_date).toLocaleDateString()}
                      </span>
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
          <p className="text-gray-400">Score progression by iteration</p>
        </CardHeader>
        <CardContent>
          <div className="h-96 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={timeSeriesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#333" />
                <XAxis 
                  dataKey="iteration" 
                  stroke="#666"
                  style={{ fontSize: '12px' }}
                />
                <YAxis 
                  stroke="#666"
                  style={{ fontSize: '12px' }}
                  domain={[30, 45]}
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: '#1a1a1a', 
                    border: '1px solid #333',
                    borderRadius: '4px'
                  }}
                />
                <Legend />
                {teams.map((team, index) => (
                  // @ts-ignore
                  <Line
                    key={team}
                    type="monotone"
                    dataKey={team}
                    stroke={colors[index % colors.length]}
                    strokeWidth={2}
                    dot
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