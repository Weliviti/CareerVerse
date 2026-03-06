import {
    Radar,
    RadarChart,
    PolarGrid,
    PolarAngleAxis,
    PolarRadiusAxis,
    ResponsiveContainer,
    Tooltip
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-[rgba(13,30,22,0.85)] backdrop-blur-md p-3 border border-white/10 shadow-lg rounded-xl">
                <p className="font-bold text-white">{label}</p>
                <p className="text-emerald-400 font-medium">
                    Score: {payload[0].value}%
                </p>
            </div>
        );
    }
    return null;
};

const SkillRadarChart = ({ data }) => {
    // Default data if none provided (matches design visualization)
    const defaultData = [
        { subject: 'Empathy', A: 85, fullMark: 100 },
        { subject: 'Logic', A: 72, fullMark: 100 },
        { subject: 'Persuasion', A: 70, fullMark: 100 },
        { subject: 'Clarity', A: 82, fullMark: 100 },
        { subject: 'Problem Solving', A: 78, fullMark: 100 },
        { subject: 'Stress Handling', A: 65, fullMark: 100 },
    ];

    const chartData = data || defaultData;

    return (
        <div className="w-full h-[300px] flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={chartData}>
                    <PolarGrid gridType="polygon" stroke="rgba(255,255,255,0.1)" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Skills"
                        dataKey="A"
                        stroke="#00e5a0"
                        strokeWidth={2}
                        fill="#00e5a0"
                        fillOpacity={0.2}
                    />
                    <Tooltip content={<CustomTooltip />} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SkillRadarChart;
