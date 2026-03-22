import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SkillRadarChart from '../components/RadarChart';

// ─── Pure-SVG Radar Chart ─────────────────────────────────────────────────────
const RadarChart = ({ skills, size = 260 }) => {
    const [animated, setAnimated] = useState(false);
    useEffect(() => { const t = setTimeout(() => setAnimated(true), 200); return () => clearTimeout(t); }, []);

    const cx = size / 2, cy = size / 2, r = size * 0.38;
    const levels = 5;
    const total = skills.length;

    // Angle for each axis (start from top, go clockwise)
    const angle = (i) => (Math.PI * 2 * i) / total - Math.PI / 2;
    const point = (i, pct) => ({
        x: cx + r * pct * Math.cos(angle(i)),
        y: cy + r * pct * Math.sin(angle(i)),
    });

    // Grid rings
    const rings = Array.from({ length: levels }, (_, i) => {
        const pct = (i + 1) / levels;
        const pts = skills.map((_, idx) => point(idx, pct));
        return pts.map((p, j) => `${j === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z';
    });

    // Data polygon
    const dataPts = skills.map((s, i) => point(i, animated ? (s.value / 100) : 0));
    const dataPath = dataPts.map((p, j) => `${j === 0 ? 'M' : 'L'}${p.x},${p.y}`).join(' ') + 'Z';

    // Axis lines
    const axes = skills.map((_, i) => ({ from: { x: cx, y: cy }, to: point(i, 1) }));

    return (
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
            <defs>
                <linearGradient id="radarFill" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#2dd4bf" stopOpacity="0.5" />
                    <stop offset="100%" stopColor="#14b8a6" stopOpacity="0.2" />
                </linearGradient>
            </defs>

            {/* Grid rings */}
            {rings.map((d, i) => (
                <path key={i} d={d} fill="none" stroke="rgba(148,163,184,0.15)" strokeWidth="1" />
            ))}

            {/* Axis lines */}
            {axes.map((ax, i) => (
                <line key={i} x1={ax.from.x} y1={ax.from.y} x2={ax.to.x} y2={ax.to.y}
                    stroke="rgba(148,163,184,0.2)" strokeWidth="1" />
            ))}

            {/* Data polygon */}
            <path d={dataPath} fill="url(#radarFill)" stroke="#2dd4bf" strokeWidth="2"
                style={{ transition: 'all 1s cubic-bezier(0.34, 1.56, 0.64, 1)' }} />

            {/* Data points */}
            {dataPts.map((p, i) => (
                <circle key={i} cx={p.x} cy={p.y} r="4" fill="#2dd4bf" stroke="#0f172a" strokeWidth="2"
                    style={{ transition: `all 1s cubic-bezier(0.34,1.56,0.64,1) ${i * 0.05}s` }} />
            ))}

            {/* Labels */}
            {skills.map((s, i) => {
                const lp = point(i, 1.28);
                const anchor = lp.x < cx - 5 ? 'end' : lp.x > cx + 5 ? 'start' : 'middle';
                return (
                    <g key={i}>
                        <text x={lp.x} y={lp.y - 4} textAnchor={anchor} fontSize="9"
                            fontWeight="700" fill="#94a3b8" letterSpacing="0.08em"
                            style={{ textTransform: 'uppercase' }}>
                            {s.label.toUpperCase()}
                        </text>
                        <text x={lp.x} y={lp.y + 9} textAnchor={anchor} fontSize="11"
                            fontWeight="800" fill="#e2e8f0">
                            {s.value}%
                        </text>
                    </g>
                );
            })}
        </svg>
    );
};

// ─── Skill Bar ────────────────────────────────────────────────────────────────
const SkillBar = ({ label, score, color, delay = 0 }) => {
    const [width, setWidth] = useState(0);
    useEffect(() => { const t = setTimeout(() => setWidth(score), 300 + delay); return () => clearTimeout(t); }, [score, delay]);
    return (
        <div className="mb-1">
            <div className="flex justify-between items-center mb-1.5">
                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">{label}</span>
                <span className="text-sm font-black text-slate-200">{score}%</span>
            </div>
            <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div className={`${color} h-full rounded-full`}
                    style={{ width: `${width}%`, transition: 'width 1.2s cubic-bezier(0.34,1.56,0.64,1)' }} />
            </div>
        </div>
    );
};

// ─── Main Page ────────────────────────────────────────────────────────────────
const SimulationResults = () => {
    const [evalData] = useState(() => {
        const saved = localStorage.getItem("latestSimulationScore");
        if (saved) {
            try { return JSON.parse(saved).data; }
            catch { return null; }
        }
        return null;
    });
    const navigate = useNavigate();
    const [scoreVisible, setScoreVisible] = useState(false);
    useEffect(() => { const t = setTimeout(() => setScoreVisible(true), 100); return () => clearTimeout(t); }, []);

    if (!evalData) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-slate-950">
                <p className="text-slate-400 mb-4">No evaluation data found.</p>
                <button onClick={() => navigate('/simulation-hub')}
                    className="text-teal-400 underline underline-offset-4">Back to Simulation Hub</button>
            </div>
        );
    }

    const { scores, feedback, summary } = evalData;

    // Normalize score keys — Gemini may return different key names
    const comm = scores.communication ?? scores.Communication ?? 0;
    const empa = scores.empathy ?? scores.Empathy ?? 0;
    const prob = scores.problem_solving ?? scores.logic ?? scores['Problem Solving'] ?? 0;
    const mgmt = scores.classroom_management ?? scores.accuracy ?? scores.Management ?? 0;
    const total = scores.total_score ?? scores.total ?? Math.round((comm + empa + prob + mgmt) / 4);

    const skills = [
        { label: 'Communication', value: comm, color: 'bg-blue-500' },
        { label: 'Empathy', value: empa, color: 'bg-pink-500' },
        { label: 'Problem Solving', value: prob, color: 'bg-amber-500' },
        { label: 'Management', value: mgmt, color: 'bg-teal-500' },
    ];

    // recharts format — matches what <SkillRadarChart> on the Dashboard expects
    const radarData = [
        { subject: 'Communication', A: comm, fullMark: 100 },
        { subject: 'Empathy', A: empa, fullMark: 100 },
        { subject: 'Problem Solving', A: prob, fullMark: 100 },
        { subject: 'Management', A: mgmt, fullMark: 100 },
    ];
    const hasRealScores = radarData.some(d => d.A > 0);

    const grade = total >= 90 ? 'Exceptional' : total >= 75 ? 'Proficient' : total >= 60 ? 'Developing' : 'Novice';
    const gradeColor = total >= 90 ? 'text-emerald-400' : total >= 75 ? 'text-teal-400' : total >= 60 ? 'text-amber-400' : 'text-red-400';

    return (
        <div className="min-h-screen bg-slate-950 py-10 px-4 flex items-start justify-center font-sans">
            <div className="max-w-4xl w-full">

                {/* ── Header ── */}
                <div className="text-center mb-10">
                    <span className="inline-block px-4 py-1.5 bg-teal-500/10 border border-teal-500/20 rounded-full text-teal-400 text-xs font-bold tracking-widest uppercase mb-4">
                        Session Report
                    </span>
                    <h1 className="text-4xl font-black text-white mb-1 tracking-tight">Simulation Results</h1>
                    <p className="text-slate-500 text-sm">AI-powered performance analysis</p>
                </div>

                {/* ── Top cards ── */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {/* Total score */}
                    <div className="md:col-span-1 bg-slate-900 rounded-2xl border border-slate-800 p-6 flex flex-col items-center justify-center text-center">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-3">Aptitude Score</p>
                        <div className="relative w-28 h-28 flex items-center justify-center mb-3">
                            <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
                                <circle cx="50" cy="50" r="44" fill="none" stroke="rgba(45,212,191,0.1)" strokeWidth="8" />
                                <circle cx="50" cy="50" r="44" fill="none" stroke="#2dd4bf" strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={`${2 * Math.PI * 44}`}
                                    strokeDashoffset={scoreVisible ? `${2 * Math.PI * 44 * (1 - total / 100)}` : `${2 * Math.PI * 44}`}
                                    style={{ transition: 'stroke-dashoffset 1.5s cubic-bezier(0.34,1.56,0.64,1)' }} />
                            </svg>
                            <div>
                                <span className="text-4xl font-black text-white">{total}</span>
                                <span className="text-lg text-slate-400">%</span>
                            </div>
                        </div>
                        <span className={`text-lg font-black ${gradeColor}`}>{grade}</span>
                    </div>

                    {/* Skill Radar — uses the same SkillRadarChart as Dashboard */}
                    <div className="md:col-span-2 bg-slate-900 rounded-2xl border border-slate-800 p-4 flex flex-col items-center justify-center">
                        <p className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-2">Skill Radar</p>
                        {hasRealScores
                            ? <SkillRadarChart data={radarData} />
                            : <p className="text-slate-600 text-sm py-10">Play through a simulation to see your radar</p>
                        }
                    </div>
                </div>

                {/* ── Skill bars ── */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 mb-4">
                    <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-5">Core Competencies</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-5">
                        {skills.map((s, i) => (
                            <SkillBar key={s.label} label={s.label} score={s.value} color={s.color} delay={i * 100} />
                        ))}
                    </div>
                </div>

                {/* ── AI Feedback ── */}
                <div className="bg-slate-900 rounded-2xl border border-slate-800 p-6 mb-6">
                    <div className="flex items-center gap-2 mb-3">
                        <div className="w-2 h-2 bg-teal-500 rounded-full animate-pulse" />
                        <h3 className="text-xs font-bold text-slate-500 uppercase tracking-widest">AI Mentor Feedback</h3>
                    </div>
                    {summary && (
                        <p className="text-teal-400 text-sm font-semibold mb-2">{summary}</p>
                    )}
                    <p className="text-slate-300 leading-relaxed text-sm italic">"{feedback}"</p>
                </div>

                {/* ── Actions ── */}
                <div className="flex gap-3">
                    <button onClick={() => navigate('/dashboard')}
                        className="flex-1 bg-teal-500 hover:bg-teal-400 text-slate-900 py-4 rounded-xl font-black text-sm tracking-wide transition-all shadow-lg shadow-teal-500/20 hover:shadow-teal-500/40">
                        View Dashboard
                    </button>
                    <button onClick={() => navigate('/simulation-hub')}
                        className="px-8 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 py-4 rounded-xl font-bold text-sm transition-all">
                        Try Again
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SimulationResults;