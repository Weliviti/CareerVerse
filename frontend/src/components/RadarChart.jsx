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
            <div className="bg-white p-3 border border-gray-100 shadow-lg rounded-xl">
                <p className="font-bold text-gray-900">{label}</p>
                <p className="text-teal-600 font-medium">
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
                    <PolarGrid gridType="polygon" stroke="#e5e7eb" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
                    />
                    <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                    <Radar
                        name="Skills"
                        dataKey="A"
                        stroke="#14b8a6"
                        strokeWidth={2}
                        fill="#2dd4bf"
                        fillOpacity={0.3}
                    />
                    <Tooltip content={<CustomTooltip />} />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
};

export default SkillRadarChart;
