import { User, Shield, Database, Globe, Sliders, ChevronRight } from "lucide-react";

export default function Settings() {
    const sections = [
        {
            title: "Account Profile",
            description: "Manage your personal information and preferences.",
            icon: User,
            items: ["Basic Information", "Professional Credentials", "Notification Preferences"]
        },
        {
            title: "Security & Access",
            description: "Secure your account with multi-factor authentication.",
            icon: Shield,
            items: ["Password Management", "2FA Settings", "Active Sessions"]
        },
        {
            title: "System Integration",
            description: "Configure third-party data sources and API keys.",
            icon: Database,
            items: ["RBI Bulletin Scraper", "NCLT Portal API", "Market News Sources"]
        },
        {
            title: "Intelligence Engine",
            description: "Tune AI analysis parameters and thresholds.",
            icon: Sliders,
            items: ["Extraction Confidence Thresholds", "Sentiment Sensitivity", "Risk Alert Triggers"]
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 py-8 animate-fade-in font-sans">
            <div className="mb-10">
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center">
                    <Globe className="mr-3 h-8 w-8 text-brand-500" /> Platform Settings
                </h1>
                <p className="mt-2 text-[15px] text-slate-500 font-medium">Manage your account, security, and AI intelligence configurations.</p>
            </div>

            <div className="grid grid-cols-1 gap-6">
                {sections.map((section, idx) => (
                    <div key={idx} className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden hover:shadow-md transition-shadow">
                        <div className="p-6">
                            <div className="flex items-start">
                                <div className="p-3 bg-brand-50 rounded-xl mr-5">
                                    <section.icon className="h-6 w-6 text-brand-600" />
                                </div>
                                <div className="flex-1">
                                    <h3 className="text-lg font-bold text-slate-900">{section.title}</h3>
                                    <p className="text-sm text-slate-500 font-medium mt-1">{section.description}</p>
                                </div>
                            </div>

                            <div className="mt-8 space-y-2">
                                {section.items.map((item, itemIdx) => (
                                    <button
                                        key={itemIdx}
                                        className="w-full flex items-center justify-between p-4 rounded-xl border border-transparent hover:border-slate-100 hover:bg-slate-50 transition-all text-left group"
                                    >
                                        <span className="text-[14px] font-bold text-slate-700 group-hover:text-brand-600 transition-colors">{item}</span>
                                        <ChevronRight className="h-4 w-4 text-slate-300 group-hover:text-brand-500 transition-colors" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="mt-12 p-6 bg-slate-900 rounded-2xl text-white flex flex-col md:flex-row items-center justify-between border border-slate-800 shadow-xl">
                <div className="mb-4 md:mb-0">
                    <h3 className="text-lg font-bold">System Status: <span className="text-brand-400">Optimal</span></h3>
                    <p className="text-sm text-slate-400 font-medium mt-1">Intelligence engine v2.4.0 is running with 98.4% uptime.</p>
                </div>
                <button className="px-6 py-2 bg-white/10 hover:bg-white/20 border border-white/10 rounded-xl text-sm font-bold transition-all">
                    View Audit Logs
                </button>
            </div>
        </div>
    );
}
