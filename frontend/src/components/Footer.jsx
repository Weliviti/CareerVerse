import React from 'react';
import { Link } from 'react-router-dom';

/**
 * Footer Component
 * Premium dark footer with animated gradient top border, brand section,
 * quick links, simulations, social icons with glow, and trust ribbon.
 */
const Footer = () => {
    return (
        <footer className="relative bg-gray-950 text-white overflow-hidden">
            {/* ── Animated gradient top border ───────────────── */}
            <div className="footer-gradient-border"></div>

            {/* ── Decorative background orbs ──────────────── */}
            <div className="absolute top-20 left-1/4 w-96 h-96 bg-teal-900 rounded-full mix-blend-screen filter blur-[120px] opacity-[0.07] pointer-events-none"></div>
            <div className="absolute bottom-10 right-1/4 w-72 h-72 bg-violet-900 rounded-full mix-blend-screen filter blur-[100px] opacity-[0.06] pointer-events-none"></div>

            {/* ── Main footer content ────────────────────── */}
            <div className="relative max-w-6xl mx-auto px-6 lg:px-8 pt-16 pb-10">
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-14">

                    {/* ── Brand Column ─────────────────── */}
                    <div className="md:col-span-4">
                        <div className="flex items-center gap-2 mb-4">
                            <div className="w-9 h-9 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-xl flex items-center justify-center shadow-lg shadow-teal-500/20">
                                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                </svg>
                            </div>
                            <span className="text-xl font-bold tracking-tight">
                                Career<span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-emerald-400">Verse</span>
                            </span>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
                            Test-drive your future career with AI-powered 3D simulations.
                            Discover your true strengths before you choose your path.
                        </p>

                        {/* Newsletter mini-form */}
                        <div className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="footer-email-input"
                            />
                            <button className="footer-subscribe-btn" aria-label="Subscribe">
                                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    {/* ── Quick Links ──────────────────── */}
                    <div className="md:col-span-2 md:col-start-6">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-5">Quick Links</h4>
                        <ul className="space-y-3">
                            <li><Link to="/" className="footer-link">Home</Link></li>
                            <li><Link to="/about" className="footer-link">About</Link></li>
                            <li><Link to="/community" className="footer-link">Community</Link></li>
                            <li><Link to="/privacy" className="footer-link">Privacy</Link></li>
                            <li><Link to="/terms" className="footer-link">Terms</Link></li>
                        </ul>
                    </div>

                    {/* ── Simulations ─────────────────── */}
                    <div className="md:col-span-3">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-5">Simulations</h4>
                        <ul className="space-y-3">
                            <li>
                                <Link to="/simulation-hub" className="footer-sim-link group">
                                    <span className="w-8 h-8 bg-blue-500/10 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-colors">
                                        <svg className="w-4 h-4 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M22 10v6M2 10l10-5 10 5-10 5-10-5z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 12v5c3 3 9 3 12 0v-5" />
                                        </svg>
                                    </span>
                                    <div>
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">The Educator</span>
                                        <span className="text-xs text-gray-500 block">Classroom simulation</span>
                                    </div>
                                </Link>
                            </li>
                            <li>
                                <Link to="/simulation-hub" className="footer-sim-link group">
                                    <span className="w-8 h-8 bg-teal-500/10 rounded-lg flex items-center justify-center group-hover:bg-teal-500/20 transition-colors">
                                        <svg className="w-4 h-4 text-teal-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </span>
                                    <div>
                                        <span className="text-sm text-gray-300 group-hover:text-white transition-colors">The Diagnostician</span>
                                        <span className="text-xs text-gray-500 block">Medical simulation</span>
                                    </div>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* ── Connect ─────────────────────── */}
                    <div className="md:col-span-3">
                        <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-300 mb-5">Connect</h4>
                        <div className="flex gap-3 mb-6">
                            {/* Twitter/X */}
                            <a href="#" className="footer-social-icon" aria-label="Twitter">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                                </svg>
                            </a>
                            {/* LinkedIn */}
                            <a href="#" className="footer-social-icon" aria-label="LinkedIn">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                </svg>
                            </a>
                            {/* GitHub */}
                            <a href="https://github.com/Weliviti/CareerVerse" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="GitHub">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                                    <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
                                </svg>
                            </a>
                            {/* Email */}
                            <a href="mailto:contact@careerverse.com" className="footer-social-icon" aria-label="Email">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                </svg>
                            </a>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">
                            Built with ❤️ by students, for students. Powered by Gemini AI.
                        </p>
                    </div>
                </div>

                {/* ── Trust / Stats Ribbon ────────────────── */}
                <div className="footer-stats-ribbon">
                    <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                        <span className="text-xs text-gray-400">AI Models Active</span>
                    </div>
                    <div className="hidden sm:block w-px h-4 bg-gray-700"></div>
                    <span className="text-xs text-gray-500">2 Simulations</span>
                    <div className="hidden sm:block w-px h-4 bg-gray-700"></div>
                    <span className="text-xs text-gray-500">3-Layer AI Architecture</span>
                    <div className="hidden sm:block w-px h-4 bg-gray-700"></div>
                    <span className="text-xs text-gray-500">WebGL Powered</span>
                </div>

                {/* ── Bottom bar ──────────────────────────── */}
                <div className="mt-10 pt-6 border-t border-gray-800/60 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-xs text-gray-500">
                        © 2026 CareerVerse. All rights reserved.
                    </p>
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                        <Link to="/privacy" className="hover:text-gray-300 transition-colors">Privacy Policy</Link>
                        <span className="text-gray-700">•</span>
                        <Link to="/terms" className="hover:text-gray-300 transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
