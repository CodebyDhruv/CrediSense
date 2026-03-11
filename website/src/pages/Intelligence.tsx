import { Search, AlertTriangle, TrendingUp, TrendingDown, BookOpen, Globe, ArrowUpRight } from "lucide-react"

export default function Intelligence() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 animate-fade-in font-sans">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center">
                        <Globe className="mr-3 h-8 w-8 text-brand-500" /> Pre-Cognitive Analysis
                    </h1>
                    <p className="mt-2 text-[15px] text-slate-500 font-medium">Real-time secondary research and global macro intelligence feed.</p>
                </div>
                <div className="mt-4 md:mt-0 flex space-x-3">
                    <div className="relative">
                        <input
                            type="text"
                            className="block w-64 pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white shadow-sm placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 sm:text-sm transition duration-200"
                            placeholder="Track entity or sector..."
                        />
                        <Search className="absolute inset-y-0 left-3 top-3 h-4 w-4 text-slate-400" />
                    </div>
                    <button className="inline-flex items-center px-6 py-2.5 border border-slate-200 text-[14px] font-bold rounded-xl shadow-sm hover:bg-slate-50 transition-colors text-slate-700 bg-white">
                        Filter Feed
                    </button>
                </div>
            </div>

            {/* Top Warning Ribbon */}
            <div className="mb-8 p-4 bg-rose-50 border border-rose-200 rounded-xl flex items-start animate-slide-up shadow-sm">
                <AlertTriangle className="h-5 w-5 text-rose-500 mr-3 mt-0.5 flex-shrink-0" />
                <div>
                    <h3 className="text-[14px] font-bold text-rose-900">High Confidence Risk Alert: Logistics Sector</h3>
                    <p className="text-[13px] text-rose-700 mt-1 font-medium leading-relaxed">Agent has detected 14 corroborating news articles indicating a severe supply chain disruption in Western corridors impacting heavy vehicle fleet operators. Re-evaluating default probabilities for 4 active CAMs.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column: Market Sentiment */}
                <div className="lg:col-span-1 space-y-8 animate-slide-up" style={{ animationDelay: '100ms' }}>
                    <div className="bg-gradient-to-br from-brand-900 to-slate-900 rounded-2xl p-6 text-white shadow-[0_8px_30px_rgba(0,0,0,0.12)] border border-slate-800">
                        <h3 className="text-[14px] font-bold text-brand-300 uppercase tracking-widest mb-6 object-center">Aggregate Sentiment Index</h3>

                        <div className="flex items-end space-x-4 mb-8">
                            <span className="text-6xl font-extrabold tracking-tighter">64.2</span>
                            <div className="flex items-center text-brand-300 mb-2 font-bold">
                                <ArrowUpRight className="h-5 w-5 mr-1" />
                                <span>+2.4 pts</span>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between text-[12px] font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                                    <span>Manufacturing</span>
                                    <span className="text-green-400">Bullish</span>
                                </div>
                                <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-green-400 h-1.5 rounded-full" style={{ width: '75%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[12px] font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                                    <span>Real Estate</span>
                                    <span className="text-rose-400">Bearish</span>
                                </div>
                                <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-rose-400 h-1.5 rounded-full" style={{ width: '30%' }}></div>
                                </div>
                            </div>
                            <div>
                                <div className="flex justify-between text-[12px] font-bold text-slate-300 mb-1.5 uppercase tracking-wide">
                                    <span>IT Services</span>
                                    <span className="text-amber-400">Neutral</span>
                                </div>
                                <div className="w-full bg-slate-700/50 rounded-full h-1.5 overflow-hidden">
                                    <div className="bg-amber-400 h-1.5 rounded-full" style={{ width: '55%' }}></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Tracked Entities */}
                    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200/60">
                        <h3 className="text-[15px] font-bold text-slate-900 mb-5">Tracked Entities (Watchlist)</h3>
                        <ul className="space-y-4">
                            <li className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0 pb-3">
                                <div>
                                    <span className="block text-[14px] font-bold text-slate-800">Stellar Dynamics Pvt Ltd</span>
                                    <span className="text-[12px] text-slate-500 font-medium tracking-wide">Heavy Eng</span>
                                </div>
                                <div className="flex items-center px-2.5 py-1 bg-green-50 text-green-700 rounded-lg text-[12px] font-bold">
                                    <TrendingUp className="h-3 w-3 mr-1" /> Outlook Up
                                </div>
                            </li>
                            <li className="flex justify-between items-center py-2 border-b border-slate-100 last:border-0 pb-3">
                                <div>
                                    <span className="block text-[14px] font-bold text-slate-800">Vanguard Retail Chain</span>
                                    <span className="text-[12px] text-slate-500 font-medium tracking-wide">FMCG</span>
                                </div>
                                <div className="flex items-center px-2.5 py-1 bg-rose-50 text-rose-700 rounded-lg text-[12px] font-bold">
                                    <TrendingDown className="h-3 w-3 mr-1" /> Downgrade
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Right Column: News & Scraped Data Feed */}
                <div className="lg:col-span-2 space-y-6 animate-slide-up" style={{ animationDelay: '200ms' }}>

                    {/* Feed Item 1 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-2">
                                <span className="px-3 py-1 bg-brand-50 text-brand-700 rounded-lg text-[11px] font-bold uppercase tracking-wider">Regulatory Change</span>
                                <span className="text-[12px] text-slate-400 font-medium">Scraped 15 mins ago from RBI Bulletins</span>
                            </div>
                            <span className="text-[20px] font-bold text-green-500">+1.2</span>
                        </div>
                        <h3 className="text-[18px] font-bold text-slate-900 mb-2 tracking-tight">Relaxed provisioning norms for Green Energy projects</h3>
                        <p className="text-[14px] text-slate-600 font-medium leading-relaxed mb-4">
                            Central bank circular indicates a 0.5% reduction in standard asset provisioning for commercial solar and wind installations, effective Q3.
                        </p>
                        <div className="flex flex-wrap gap-2 text-[12px]">
                            <span className="px-2.5 py-1.5 bg-slate-100 text-slate-600 rounded-md font-semibold flex items-center"><BookOpen className="h-3.5 w-3.5 mr-1" /> Found in 3 Official Sources</span>
                            <span className="px-2.5 py-1.5 bg-blue-50 text-blue-700 rounded-md font-semibold">Impacts 7 active CAMs</span>
                        </div>
                    </div>

                    {/* Feed Item 2 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-2">
                                <span className="px-3 py-1 bg-amber-50 text-amber-700 rounded-lg text-[11px] font-bold uppercase tracking-wider">Litigation Scrape</span>
                                <span className="text-[12px] text-slate-400 font-medium">Scraped 2 hrs ago from NCLT Portals</span>
                            </div>
                            <span className="text-[20px] font-bold text-rose-500">-3.4</span>
                        </div>
                        <h3 className="text-[18px] font-bold text-slate-900 mb-2 tracking-tight">New insolvency petition against prominent infrastructure supplier</h3>
                        <p className="text-[14px] text-slate-600 font-medium leading-relaxed mb-4">
                            Operational creditor has filed a section 9 petition against 'Apex Buildwell Corp'. NLP engine confidence on entity match: 98.4%. Immediate freeze on credit lines recommended pending tribunal admission.
                        </p>
                        <div className="flex flex-wrap gap-2 text-[12px]">
                            <span className="px-2.5 py-1.5 bg-slate-100 text-slate-600 rounded-md font-semibold flex items-center"><AlertTriangle className="h-3.5 w-3.5 mr-1 text-slate-500" /> Action Required</span>
                            <span className="px-2.5 py-1.5 border border-slate-200 text-slate-700 rounded-md font-bold hover:bg-slate-50 cursor-pointer">View Case Details</span>
                        </div>
                    </div>

                    {/* Feed Item 3 */}
                    <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200/60 hover:shadow-md transition-shadow opacity-75">
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center space-x-2">
                                <span className="px-3 py-1 bg-slate-100 text-slate-700 rounded-lg text-[11px] font-bold uppercase tracking-wider">Market Noise</span>
                                <span className="text-[12px] text-slate-400 font-medium">Scraped 5 hrs ago via X/Twitter API</span>
                            </div>
                            <span className="text-[20px] font-bold text-slate-400">0.0</span>
                        </div>
                        <h3 className="text-[18px] font-bold text-slate-900 mb-2 tracking-tight">Unverified rumors round major IT leadership exit</h3>
                        <p className="text-[14px] text-slate-600 font-medium leading-relaxed mb-4">
                            High volume of social media mentions regarding CFO departure from mid-cap SaaS firm 'CloudSync'. Cross-referencing SEC/BSE filings shows no official disclosures yet. Flagging as low-confidence noise.
                        </p>
                    </div>

                </div>
            </div>
        </div>
    )
}
