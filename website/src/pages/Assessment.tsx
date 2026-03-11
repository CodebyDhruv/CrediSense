import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Building2, UploadCloud, Database, PieChart,
  ArrowLeft, CheckCircle, AlertTriangle, FileText,
  Download, Activity, Check, X, Pencil, Save
} from 'lucide-react';

export default function Assessment() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // --- STAGE 1 STATE: Entity Onboarding ---
  const [formData, setFormData] = useState({
    cin: '',
    pan: '',
    sector: 'Manufacturing',
    turnover: '',
    loanType: 'Term Loan',
    loanAmount: '',
    tenure: '',
    expectedRate: ''
  });

  // --- STAGE 2 STATE: Document Ingestion ---
  const [uploads, setUploads] = useState<Record<string, boolean>>({
    alm: false,
    sh: false,
    bp: false,
    ar: false,
    pc: false
  });
  const [activeUploadDoc, setActiveUploadDoc] = useState<string | null>(null);

  // --- STAGE 3 STATE: Extraction & Schema ---
  const [classifications, setClassifications] = useState({
    alm: 'Pending',
    shareholding: 'Pending',
    borrowing: 'Pending',
    annual: 'Pending',
    portfolio: 'Pending'
  });

  const [extractionData, setExtractionData] = useState([
    { id: 1, field: 'EBITDA Margin', value: '18.4%', confidence: '98%', status: 'view' },
    { id: 2, field: 'Total Borrowings (Cr)', value: '₹1,250', confidence: '95%', status: 'view' },
    { id: 3, field: 'Promoter Pledge', value: '15%', confidence: '72%', status: 'view' }
  ]);

  const stages = [
    { num: 1, title: 'Entity Onboarding', icon: Building2 },
    { num: 2, title: 'Intelligent Ingestion', icon: UploadCloud },
    { num: 3, title: 'Extraction & Schema', icon: Database },
    { num: 4, title: 'Analysis & Reporting', icon: PieChart },
  ];

  // --- HANDLERS ---
  const handleNext = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(prev => prev + 1);
    }, 1200);
  };

  const updateForm = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const triggerUpload = (docId: string) => {
    setActiveUploadDoc(docId);
    fileInputRef.current?.click();
  };

  const handleFileChange = () => {
    if (activeUploadDoc) {
      setUploads(prev => ({ ...prev, [activeUploadDoc]: true }));
      setActiveUploadDoc(null);
    }
  };

  const handleClassification = (doc: keyof typeof classifications, status: string) => {
    setClassifications(prev => ({ ...prev, [doc]: status }));
  };

  const toggleEdit = (id: number) => {
    setExtractionData(prev => prev.map(item =>
      item.id === id ? { ...item, status: item.status === 'view' ? 'edit' : 'view' } : item
    ));
  };

  const updateExtractionValue = (id: number, value: string) => {
    setExtractionData(prev => prev.map(item =>
      item.id === id ? { ...item, value } : item
    ));
  };

  const allUploaded = Object.values(uploads).every(v => v);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 animate-fade-in font-sans">
      <button
        onClick={() => navigate('/assessments')}
        className="flex items-center text-sm font-semibold text-slate-500 hover:text-slate-900 mb-8 transition-colors"
      >
        <ArrowLeft className="h-4 w-4 mr-2" /> Back to Assessments
      </button>

      <div className="mb-10">
        <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Investment Assessment Pipeline</h1>
        <p className="mt-2 text-[15px] font-medium text-slate-500">Transforming unstructured financial data into cognitive insights.</p>
      </div>

      <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" />

      {/* Modern Stepper */}
      <div className="mb-12 relative">
        <div className="absolute top-1/2 left-0 w-full h-1 bg-slate-200/60 -translate-y-1/2 z-0 rounded-full"></div>
        <div
          className="absolute top-1/2 left-0 h-1 bg-brand-500 -translate-y-1/2 z-0 rounded-full transition-all duration-500"
          style={{ width: `${((step - 1) / 3) * 100}%` }}
        ></div>

        <div className="relative z-10 flex justify-between">
          {stages.map((stg) => {
            const Icon = stg.icon;
            return (
              <div key={stg.num} className="flex flex-col items-center">
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center border-[3px] transition-all duration-300 ${step > stg.num
                    ? 'bg-brand-500 border-brand-500 text-white'
                    : step === stg.num
                      ? 'bg-white border-brand-500 text-brand-600 shadow-[0_0_15px_rgba(20,184,166,0.3)]'
                      : 'bg-white border-slate-200 text-slate-400'
                    }`}
                >
                  {step > stg.num ? <CheckCircle className="h-6 w-6" /> : <Icon className="h-5 w-5" />}
                </div>
                <span className={`mt-3 text-[13px] font-bold ${step >= stg.num ? 'text-slate-900' : 'text-slate-400'}`}>
                  {stg.title}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stage 1: Entity Onboarding */}
      {step === 1 && (
        <div className="bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-200/50 animate-slide-up">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center tracking-tight">
              <Building2 className="mr-3 h-7 w-7 text-brand-500" /> Stage 1: Entity Onboarding
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="space-y-5">
              <h3 className="text-[14px] font-bold text-slate-400 uppercase tracking-wider">Entity Details</h3>
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Company Identifiers</label>
                <div className="grid grid-cols-2 gap-3">
                  <input type="text" name="cin" value={formData.cin} onChange={updateForm} placeholder="CIN Number" className="w-full border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 text-[14px] p-3 shadow-sm transition-all outline-none" />
                  <input type="text" name="pan" value={formData.pan} onChange={updateForm} placeholder="PAN" className="w-full border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 text-[14px] p-3 shadow-sm transition-all outline-none" />
                </div>
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Sector & Sub-sector</label>
                <select name="sector" value={formData.sector} onChange={updateForm} className="w-full border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 text-[14px] p-3 shadow-sm transition-all outline-none bg-white font-medium">
                  <option>Manufacturing</option>
                  <option>Information Technology</option>
                  <option>Financial Services</option>
                  <option>Healthcare</option>
                </select>
              </div>
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Annual Turnover (INR Cr)</label>
                <input type="number" name="turnover" value={formData.turnover} onChange={updateForm} placeholder="e.g. 500" className="w-full border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 text-[14px] p-3 shadow-sm transition-all outline-none font-medium" />
              </div>
            </div>

            <div className="space-y-5">
              <h3 className="text-[14px] font-bold text-slate-400 uppercase tracking-wider">Application Parameters</h3>
              <div>
                <label className="block text-[13px] font-semibold text-slate-700 mb-1.5">Loan Profile</label>
                <div className="grid grid-cols-2 gap-3 mb-3">
                  <select name="loanType" value={formData.loanType} onChange={updateForm} className="w-full border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 text-[14px] p-3 shadow-sm transition-all outline-none bg-white font-medium">
                    <option>Term Loan</option>
                    <option>Working Capital</option>
                    <option>Bill Discounting</option>
                  </select>
                  <div className="relative">
                    <span className="absolute left-3 top-3 text-slate-400 text-[14px] font-bold">₹</span>
                    <input type="number" name="loanAmount" value={formData.loanAmount} onChange={updateForm} placeholder="Amount (Cr)" className="w-full pl-7 border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 text-[14px] p-3 shadow-sm transition-all outline-none font-medium text-slate-900" />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="relative">
                    <input type="number" name="tenure" value={formData.tenure} onChange={updateForm} placeholder="Tenure" className="w-full pr-12 border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 text-[14px] p-3 shadow-sm transition-all outline-none font-medium" />
                    <span className="absolute right-3 top-3 text-slate-400 text-[13px] font-bold">Mos</span>
                  </div>
                  <div className="relative">
                    <input type="number" name="expectedRate" value={formData.expectedRate} onChange={updateForm} placeholder="Expected Rate" className="w-full pr-8 border-slate-200 rounded-xl focus:ring-2 focus:ring-brand-500/50 focus:border-brand-500 text-[14px] p-3 shadow-sm transition-all outline-none font-medium" />
                    <span className="absolute right-3 top-3 text-slate-400 text-[14px] font-bold">%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-slate-100">
            <button
              onClick={handleNext}
              disabled={loading || !formData.cin || !formData.loanAmount}
              className="bg-brand-600 text-white px-8 py-3.5 rounded-xl font-bold text-[15px] shadow-[0_4px_14px_rgba(13,148,136,0.39)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.23)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 flex items-center"
            >
              {loading ? <Activity className="animate-spin h-5 w-5 mr-2" /> : 'Proceed to Ingestion'}
            </button>
          </div>
        </div>
      )}

      {/* Stage 2: Intelligent Data Ingestion */}
      {step === 2 && (
        <div className="bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-200/50 animate-slide-up">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center tracking-tight">
              <UploadCloud className="mr-3 h-7 w-7 text-brand-500" /> Stage 2: Target File Ingestion
            </h2>
          </div>
          <p className="text-[15px] text-slate-500 mb-8 font-medium">Please upload the 5 critical document types required for the pipeline. Unstructured formats (PDF, Excel, Images) are supported.</p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mb-8">
            {[
              { id: 'alm', title: 'ALM Statements' },
              { id: 'sh', title: 'Shareholding Pattern' },
              { id: 'bp', title: 'Borrowing Profile' },
              { id: 'ar', title: 'Annual Reports' },
              { id: 'pc', title: 'Portfolio Cuts' },
            ].map((doc) => (
              <div
                key={doc.id}
                onClick={() => triggerUpload(doc.id)}
                className={`border-2 border-dashed ${uploads[doc.id] ? 'border-green-500 bg-green-50/20' : 'border-slate-200 hover:border-brand-400 hover:bg-brand-50/30'} p-6 rounded-2xl text-center transition-all group cursor-pointer relative overflow-hidden`}
              >
                {uploads[doc.id] ? (
                  <CheckCircle className="h-8 w-8 text-green-500 mx-auto mb-3" />
                ) : (
                  <FileText className="h-8 w-8 text-slate-400 group-hover:text-brand-500 mx-auto mb-3 transition-colors" />
                )}
                <h3 className="text-[14px] font-bold text-slate-700 mb-1">{doc.title}</h3>
                <p className="text-[12px] text-slate-400 font-medium mb-4">{uploads[doc.id] ? 'File Ready' : 'PDF, XLSX, DOCX'}</p>
                <button className={`text-[13px] font-bold px-4 py-2 rounded-lg transition-colors ${uploads[doc.id] ? 'bg-green-100 text-green-700' : 'text-brand-600 bg-brand-50 group-hover:bg-brand-100'}`}>
                  {uploads[doc.id] ? 'Uploaded' : 'Select File'}
                </button>
              </div>
            ))}
          </div>

          <div className="flex justify-end pt-6 border-t border-slate-100">
            <button
              onClick={handleNext}
              disabled={loading || !allUploaded}
              className="bg-brand-600 text-white px-8 py-3.5 rounded-xl font-bold text-[15px] shadow-[0_4px_14px_rgba(13,148,136,0.39)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.23)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 flex items-center"
            >
              {loading ? <Activity className="animate-spin h-5 w-5 mr-2" /> : 'Run Extraction Pipeline'}
            </button>
          </div>
        </div>
      )}

      {/* Stage 3: Automated Extraction & Schema Mapping */}
      {step === 3 && (
        <div className="bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-200/50 animate-slide-up">
          <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-100">
            <h2 className="text-2xl font-bold text-slate-900 flex items-center tracking-tight">
              <Database className="mr-3 h-7 w-7 text-brand-500" /> Stage 3: Extraction & Verification
            </h2>
          </div>

          <div className="space-y-8 mb-8">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h3 className="text-[15px] font-bold text-slate-900 mb-4 flex items-center uppercase tracking-widest text-[13px]">
                Human-in-the-loop Classification Approval
              </h3>
              <div className="space-y-3">
                {[
                  { id: 'alm' as const, label: 'Asset-Liability Management (ALM)', file: 'stmt_alm_fy24.pdf' },
                  { id: 'shareholding' as const, label: 'Shareholding Pattern', file: 'cap_table_q3.xlsx' },
                  { id: 'borrowing' as const, label: 'Borrowing Profile', file: 'loan_schedule_v2.pdf' },
                  { id: 'annual' as const, label: 'Annual Reports (P&L, BS)', file: 'annual_report_audited.pdf' },
                  { id: 'portfolio' as const, label: 'Portfolio Cuts/Performance', file: 'portfolio_metrics.xlsx' }
                ].map((doc) => (
                  <div key={doc.id} className="flex items-center justify-between bg-white p-4 rounded-xl border border-slate-200/60 shadow-sm">
                    <div className="flex items-center">
                      <FileText className={`h-5 w-5 mr-3 transition-colors ${classifications[doc.id] === 'Approved' ? 'text-green-500' : 'text-slate-400'}`} />
                      <div>
                        <p className="text-[14px] font-bold text-slate-800">{doc.label}</p>
                        <p className="text-[12px] text-slate-500 font-medium">{doc.file}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {classifications[doc.id] === 'Pending' ? (
                        <>
                          <button onClick={() => handleClassification(doc.id, 'Approved')} className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"><Check className="h-5 w-5" /></button>
                          <button onClick={() => handleClassification(doc.id, 'Denied')} className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"><X className="h-5 w-5" /></button>
                        </>
                      ) : (
                        <div className="flex items-center">
                          <span className={`px-3 py-1 text-[12px] font-bold rounded-lg ${classifications[doc.id] === 'Approved' ? 'bg-green-50 text-green-700' : 'bg-rose-50 text-rose-700'}`}>
                            {classifications[doc.id]}
                          </span>
                          <button onClick={() => handleClassification(doc.id, 'Pending')} className="ml-2 p-1 text-slate-300 hover:text-slate-500 transition-colors"><X className="h-4 w-4" /></button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-[15px] font-bold text-slate-900 uppercase tracking-widest text-[13px]">Dynamic Schema Mapping</h3>
                <button className="text-[13px] font-bold text-brand-600 hover:text-brand-700 bg-brand-50 px-3 py-1.5 rounded-lg border border-brand-100">Configure Schema</button>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr>
                      <th className="border-b border-slate-200 py-3 text-[12px] font-bold text-slate-400 uppercase tracking-wider">Target Field</th>
                      <th className="border-b border-slate-200 py-3 text-[12px] font-bold text-slate-400 uppercase tracking-wider">Extracted Value</th>
                      <th className="border-b border-slate-200 py-3 text-[12px] font-bold text-slate-400 uppercase tracking-wider text-center">Confidence</th>
                      <th className="border-b border-slate-200 py-3 text-[12px] font-bold text-slate-400 uppercase tracking-wider text-right">Adjustment</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {extractionData.map((row) => (
                      <tr key={row.id} className="hover:bg-slate-100/50 transition-colors">
                        <td className="py-4 text-[14px] font-semibold text-slate-700">{row.field}</td>
                        <td className="py-4 text-[14px] text-slate-900 font-extrabold">
                          {row.status === 'edit' ? (
                            <input
                              type="text"
                              value={row.value}
                              onChange={(e) => updateExtractionValue(row.id, e.target.value)}
                              className="border-b border-brand-500 bg-transparent focus:outline-none w-full"
                              autoFocus
                            />
                          ) : (
                            row.value
                          )}
                        </td>
                        <td className="py-4 text-center">
                          <span className={`px-2 py-1 rounded ${parseInt(row.confidence) > 80 ? 'bg-green-100 text-green-800' : 'bg-amber-100 text-amber-800'} text-[11px] font-bold`}>
                            {row.confidence}
                          </span>
                        </td>
                        <td className="py-4 text-right">
                          <button onClick={() => toggleEdit(row.id)} className="text-slate-400 hover:text-brand-600 transition-colors p-2 rounded-lg hover:bg-white shadow-sm border border-transparent hover:border-slate-100">
                            {row.status === 'edit' ? <Save className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-6 border-t border-slate-100">
            <button
              onClick={handleNext}
              disabled={loading || Object.values(classifications).includes('Pending')}
              className="bg-brand-600 text-white px-8 py-3.5 rounded-xl font-bold text-[15px] shadow-[0_4px_14px_rgba(13,148,136,0.39)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.23)] hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:hover:translate-y-0 flex items-center"
            >
              {loading ? <Activity className="animate-spin h-5 w-5 mr-2" /> : 'Run Secondary AI Analysis'}
            </button>
          </div>
        </div>
      )}

      {/* Stage 4: Secondary Analysis & Reporting */}
      {step === 4 && (
        <div className="bg-white p-8 rounded-2xl shadow-[0_4px_24px_rgba(0,0,0,0.04)] border border-slate-200/50 animate-slide-up">
          <div className="flex items-start justify-between mb-8 pb-4 border-b border-slate-100">
            <div>
              <h2 className="text-2xl font-bold text-slate-900 flex items-center tracking-tight mb-2">
                <PieChart className="mr-3 h-7 w-7 text-brand-500" /> Final Assessment Report
              </h2>
              <p className="text-[15px] text-slate-500 font-medium tracking-wide">Cognitive Investment Memo for <span className="text-slate-900 font-extrabold">{formData.cin || 'Entity-0824'}</span></p>
            </div>
            <button className="flex items-center bg-slate-900 text-white px-6 py-3 rounded-xl font-bold text-[14px] hover:bg-slate-800 transition-all hover:shadow-lg">
              <Download className="mr-2 h-4 w-4" /> Download Investment Report
            </button>
          </div>

          {/* Triangulation & Prediction Header */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-gradient-to-br from-brand-900 to-slate-900 border border-slate-800 p-6 rounded-2xl text-white shadow-lg">
              <p className="text-[12px] font-bold text-brand-300 uppercase tracking-widest mb-2">Recommendation</p>
              <div className="flex items-baseline space-x-2 mb-1">
                <p className="text-4xl font-extrabold">Approved</p>
                <CheckCircle className="h-5 w-5 text-brand-400" />
              </div>
              <p className="text-[14px] font-bold text-slate-300">Amount: ₹{formData.loanAmount || '0'} Cr</p>
              <p className="text-[12px] font-medium text-slate-400 mt-2">Premium: +150 bps</p>
            </div>
            <div className="md:col-span-2 bg-slate-50 border border-slate-200 p-6 rounded-2xl">
              <h3 className="text-[13px] font-bold text-slate-900 mb-2 uppercase tracking-widest">Reasoning Engine Logic</h3>
              <p className="text-[14px] text-slate-700 leading-relaxed font-semibold">
                Cognitive extraction from {formData.sector} documents confirms steady {extractionData[0].value} {extractionData[0].field} growth. Secondary research triangulated from RBI news bulletins indicates stable liquidity. The requested ₹{formData.loanAmount} Cr limit is well-covered by projected cashflows, although the {extractionData[2].value} {extractionData[2].field} necessitates a conservative risk premium.
              </p>
            </div>
          </div>

          {/* Secondary Research Feed */}
          <div className="mb-8">
            <h3 className="text-[16px] font-extrabold text-slate-900 mb-5 tracking-tight flex items-center">
              <Activity className="h-5 w-5 text-brand-500 mr-2" /> Pre-Cognitive Risk Signals (External Data)
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex p-5 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-amber-200 transition-colors">
                <AlertTriangle className="h-5 w-5 text-amber-500 mr-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[14px] font-bold text-slate-900">Sectoral Headwinds</p>
                  <p className="text-[13px] text-slate-600 font-medium mt-1 leading-snug tracking-tight">AI scraping of industrial news portals confirms potential labor cost inflation in the {formData.sector} domain for next fiscal.</p>
                </div>
              </div>
              <div className="flex p-5 bg-white border border-slate-100 rounded-xl shadow-sm hover:border-green-200 transition-colors">
                <Activity className="h-5 w-5 text-green-500 mr-4 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[14px] font-bold text-slate-900">Positive Market Sentiment</p>
                  <p className="text-[13px] text-slate-600 font-medium mt-1 leading-snug tracking-tight">Secondary triangulation shows 94% positive sentiment across financial forums regarding this entity's operational stability.</p>
                </div>
              </div>
            </div>
          </div>

          {/* GenAI SWOT */}
          <div className="mb-8">
            <h3 className="text-[16px] font-extrabold text-slate-900 mb-5 tracking-tight flex items-center">Cognitive SWOT</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-5 border border-green-200 bg-green-50/30 rounded-2xl">
                <h4 className="text-[12px] font-bold text-green-800 mb-3 uppercase tracking-widest">Strengths</h4>
                <p className="text-[13px] text-green-900 font-bold leading-tight">High Extraction Confidence on audited Balance Sheets.</p>
              </div>
              <div className="p-5 border border-rose-200 bg-rose-50/30 rounded-2xl">
                <h4 className="text-[12px] font-bold text-rose-800 mb-3 uppercase tracking-widest">Weaknesses</h4>
                <p className="text-[13px] text-rose-900 font-bold leading-tight">Entity has a {extractionData[2].value} pledge on promoter shares.</p>
              </div>
              <div className="p-5 border border-brand-200 bg-brand-50/30 rounded-2xl">
                <h4 className="text-[12px] font-bold text-brand-800 mb-3 uppercase tracking-widest">Opportunities</h4>
                <p className="text-[13px] text-brand-900 font-bold leading-tight">Macro news shows rising demand in {formData.sector}.</p>
              </div>
              <div className="p-5 border border-amber-200 bg-amber-50/30 rounded-2xl">
                <h4 className="text-[12px] font-bold text-amber-800 mb-3 uppercase tracking-widest">Threats</h4>
                <p className="text-[13px] text-amber-900 font-bold leading-tight">Regulatory shifts might impact debt-to-equity caps.</p>
              </div>
            </div>
          </div>

          <div className="flex justify-between border-t border-slate-100 pt-6">
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 border border-slate-200 rounded-xl text-[14px] font-bold text-slate-500 hover:bg-slate-50 hover:text-slate-900 transition-all"
            >
              Finish & Return
            </button>
            <div className="flex space-x-3">
              <button className="px-6 py-3 border border-brand-500 text-brand-600 rounded-xl font-bold text-[14px] hover:bg-brand-50 transition-all">
                Request Clarification
              </button>
              <button
                className="bg-brand-600 text-white px-8 py-3 rounded-xl font-bold text-[14px] shadow-[0_4px_14px_rgba(13,148,136,0.39)] hover:shadow-[0_6px_20px_rgba(13,148,136,0.23)] hover:-translate-y-0.5 transition-all"
              >
                Confirm Investment Report
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
