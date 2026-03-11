import { useNavigate } from "react-router-dom";
import { Plus, Search, FileText, ChevronRight, Filter, Clock, CheckCircle, AlertTriangle } from "lucide-react";

const assessments = [
    {
        id: "CAM-2024-001",
        entity: "TechVision Global Pvt Ltd",
        sector: "IT Consulting",
        amount: "₹250 Cr",
        status: "Extraction Pending",
        date: "2024-03-10",
        risk: "Low",
    },
    {
        id: "CAM-2024-002",
        entity: "Apex Manufacturing Ltd",
        sector: "Industrials",
        amount: "₹120 Cr",
        status: "Action Required",
        date: "2024-03-09",
        risk: "Medium",
    },
    {
        id: "CAM-2024-003",
        entity: "Green-Energy Solutions",
        sector: "Renewables",
        amount: "₹450 Cr",
        status: "Approved",
        date: "2024-03-08",
        risk: "Low",
    }
];

export default function Assessments() {
    const navigate = useNavigate();

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8 py-8 animate-fade-in font-sans">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight flex items-center">
                        <FileText className="mr-3 h-8 w-8 text-brand-500" /> Investment Assessments
                    </h1>
                    <p className="mt-2 text-[15px] text-slate-500 font-medium">Manage and track all corporate credit assessments in your pipeline.</p>
                </div>
                <div className="mt-4 md:mt-0">
                    <button
                        onClick={() => navigate("/assessments/new")}
                        className="inline-flex items-center px-6 py-3 border border-transparent text-[15px] font-bold rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-0.5 text-white bg-slate-900 hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-900"
                    >
                        <Plus className="mr-2 h-5 w-5" /> Start New Assessment
                    </button>
                </div>
            </div>

            {/* Filters & Search */}
            <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200/60 mb-8 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                <div className="relative flex-1">
                    <input
                        type="text"
                        className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 rounded-xl leading-5 bg-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 sm:text-sm transition duration-200"
                        placeholder="Search by entity, ID, or sector..."
                    />
                    <Search className="absolute inset-y-0 left-3 top-3.5 h-4 w-4 text-slate-400" />
                </div>
                <button className="inline-flex items-center px-4 py-2.5 border border-slate-200 text-sm font-bold rounded-xl text-slate-700 bg-white hover:bg-slate-50 transition-colors">
                    <Filter className="mr-2 h-4 w-4" /> Filters
                </button>
            </div>

            {/* Assessments Table */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200/60 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-slate-200">
                        <thead className="bg-slate-50">
                            <tr>
                                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest">Assessment ID</th>
                                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest">Entity</th>
                                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest">Amount</th>
                                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest">Status</th>
                                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest">Risk Level</th>
                                <th scope="col" className="px-6 py-4 text-left text-[11px] font-bold text-slate-500 uppercase tracking-widest">Date</th>
                                <th scope="col" className="relative px-6 py-4">
                                    <span className="sr-only">Actions</span>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-slate-100">
                            {assessments.map((item) => (
                                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors cursor-pointer group" onClick={() => navigate("/assessments/new")}>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className="text-sm font-bold text-slate-900">{item.id}</span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <div className="text-sm font-bold text-brand-600">{item.entity}</div>
                                        <div className="text-[12px] text-slate-500 font-medium">{item.sector}</div>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className="text-sm font-extrabold text-slate-900">{item.amount}</span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className={`inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-bold border ${item.status === "Approved" ? "bg-green-50 text-green-700 border-green-100" :
                                                item.status === "Action Required" ? "bg-amber-50 text-amber-700 border-amber-100" :
                                                    "bg-brand-50 text-brand-700 border-brand-100"
                                            }`}>
                                            {item.status === "Approved" ? <CheckCircle className="h-3 w-3 mr-1" /> :
                                                item.status === "Action Required" ? <AlertTriangle className="h-3 w-3 mr-1" /> :
                                                    <Clock className="h-3 w-3 mr-1" />}
                                            {item.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap">
                                        <span className={`text-[12px] font-bold ${item.risk === "Low" ? "text-green-600" : "text-amber-600"}`}>
                                            {item.risk}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-sm text-slate-500 font-medium">
                                        {item.date}
                                    </td>
                                    <td className="px-6 py-5 whitespace-nowrap text-right text-sm font-medium">
                                        <ChevronRight className="h-5 w-5 text-slate-300 group-hover:text-brand-500 transition-colors inline" />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
