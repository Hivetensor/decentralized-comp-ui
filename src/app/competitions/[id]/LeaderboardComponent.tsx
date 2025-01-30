// LeaderboardComponent.tsx
import React, {useMemo} from 'react';
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Badge} from "@/components/ui/badge";
import {CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis} from 'recharts';
import {LeaderboardEntry} from '@/types';

interface LeaderboardComponentProps {
    leaderboardData: LeaderboardEntry[];
}

const LeaderboardComponent = ({leaderboardData}: LeaderboardComponentProps) => {
    if (!leaderboardData?.length) {
        return (
            <Card className="bg-gray-900 border-gray-800">
                <CardHeader>
                    <CardTitle className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-cyan-400">
                        Leaderboard
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="text-center py-8 text-gray-400">
                        No participants yet. Be the first to join!
                    </div>
                </CardContent>
            </Card>
        );
    }
    const colors = [
        '#ff0099', '#00ff99', '#9900ff', '#ff9900', '#00ffff',
        '#ff00ff', '#99ff00', '#0099ff', '#ffff00', '#ff0000'
    ];

    // Transform data for time series chart
    const timeSeriesData = useMemo(() => {
        if (!leaderboardData?.length) return [];

        const numIterations = leaderboardData[0].scores?.length || 0;
        if (numIterations === 0) return [];

        return Array.from({length: numIterations}, (_, iteration) => {
            const point: { [key: string]: any } = {iteration: `Iteration ${iteration + 1}`};

            leaderboardData.forEach(entry => {
                if (entry.scores?.[iteration] !== undefined) {
                    point[entry.team_name] = entry.scores[iteration];
                }
            });

            return point;
        });
    }, [leaderboardData]);

    // Get final scores for leaderboard table
    const finalScores = useMemo(() => {
        return leaderboardData
            .map(entry => ({
                team_name: entry.team_name,
                score: entry.score,
                submission_date: entry.submission_date,
                rank: entry.rank
            }))
            .sort((a, b) => b.score - a.score);
    }, [leaderboardData]);

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
                            {finalScores.map((entry) => (
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
                                        <span className="text-cyan-400">{entry.score.toFixed(4)}</span>
                                    </td>
                                    <td className="p-4">
                                            <span className="text-purple-400">
                                                {new Date(entry.submission_date).toLocaleString()}
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
                                <CartesianGrid strokeDasharray="3 3" stroke="#333"/>
                                <XAxis
                                    dataKey="iteration"
                                    stroke="#666"
                                    style={{fontSize: '12px'}}
                                />
                                <YAxis
                                    stroke="#666"
                                    style={{fontSize: '12px'}}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1a1a1a',
                                        border: '1px solid #333',
                                        borderRadius: '4px'
                                    }}
                                />
                                <Legend/>
                                {leaderboardData.map((entry, index) => (
                                    <Line
                                        key={entry.team_name}
                                        type="monotone"
                                        dataKey={entry.team_name}
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