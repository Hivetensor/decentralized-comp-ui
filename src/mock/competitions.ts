export const mockCompetitions = [
    {
        id: 1,
        title: "Neural Network Optimization Challenge",
        description: "Optimize a neural network for maximum efficiency on a specific task while maintaining accuracy.",
        prize: "50,000 TAO",
        participants: 156,
        start_date: "2025-02-01",
        deadline: "2025-03-01",
        difficulty: "Advanced" as "Advanced" | "Expert" | "Beginner" | "Intermediate",
        status: "Active",
        tags: ["Neural Networks", "Optimization", "PyTorch"],
        rules: [
            "Must use provided dataset only",
            "Submissions must include documentation",
            "Code must be original"
        ]
    },
    {
        id: 2,
        title: "Bittensor Validator Enhancement",
        description: "Create an improved validation mechanism for subnet validators.",
        prize: "75,000 TAO",
        participants: 89,
        start_date: "2025-02-15",
        deadline: "2025-04-15",
        difficulty: "Expert",
        status: "Upcoming",
        tags: ["Bittensor", "Validation", "Blockchain"],
        rules: [
            "Must be compatible with existing validator framework",
            "Include comprehensive testing suite",
            "Document all security considerations"
        ]
    }
];

export const mockLeaderboard = [
    {
        rank: 1,
        team_name: "OptimizePrime",
        score: 0.956,
        scores: [0.891, 0.912, 0.934, 0.956],
        submission_date: Date.now() - 86400000 // 1 day ago
    },
    {
        rank: 2,
        team_name: "DeepMinds",
        score: 0.943,
        scores: [0.876, 0.901, 0.922, 0.943],
        submission_date: Date.now() - 172800000 // 2 days ago
    }
];