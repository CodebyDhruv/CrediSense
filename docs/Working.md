# How CreditSense Works

CreditSense is designed to automate the generation of a Comprehensive Credit Appraisal Memo (CAM) for corporate lending. It eliminates the "Data Paradox" by instantly synthesizing structured, unstructured, and external data into actionable lending decisions.

This document details the inner workings of the system, including what technologies and ML models are employed, why they were chosen, and how the frontend and backend interact to deliver the final decision.

---

## 1. What ML Models Are We Using and Why?

The system relies heavily on Large Language Models (LLMs) orchestrated via **LangChain**, rather than traditional ML classifiers, because corporate credit appraisal requires deep semantic understanding, reasoning, and the ability to unstructured parse messy financial texts.

### Primary LLM: Evaluator & Synthesizer

- **Model**: GPT-4o (via OpenAI API) or Gemini 1.5 Pro.
- **Why**: These frontier models are required to handle complex "needle-in-a-haystack" parsing (e.g., finding a hidden covenant in a 200-page Annual Report) and for "Explainability." The challenge explicitly requires the AI to "walk the judge through" its logic, which requires high-tier generative reasoning.
- **Use Cases**:
  - **Unstructured Parsing**: Extracting key financial commitments and risks from PDFs.
  - **Research Synthesis**: Summarizing the search results from the Research Agent into structured Risk Alerts.
  - **CAM Generation**: Drafting the final Word/PDF memo based on all inputs.

### NLP for Document Extraction

- **Tool**: `pdfplumber` / `PyPDF2` combined with the LLM.
- **Why**: Indian-context scanned PDFs are notoriously messy. We need `pdfplumber` to accurately preserve table structures and spatial coordinates before passing the heavy text blocks to the LLM for entity extraction.

### Scoring Model (Decision Logic)

- **Model**: Custom Rule-Based Engine + LLM Validation (Hybrid approach).
- **Why**: Pure black-box ML models are often rejected by risk committees. We use a transparent, deterministic scoring calculation (leveraging traditional ratios from the ingested data) but use the LLM to write the _narrative justification_ (e.g., "Rejected because Leverage Ratio > 4x and recent litigation alert flagged by Research Agent").

---

## 2. Backend Architecture: Required Endpoints

The FastAPI backend (`/servers`) exposes the following core endpoints to support the frontend portal:

### A. Data Ingestion & Processing

- `POST /api/v1/ingest/document`
  - **Payload**: Multipart form data (PDFs like Annual Reports, Sanction Letters).
  - **Action**: Calls `pdfplumber` to parse text -> sends to LLM to extract financial covenants and risks -> returns structured JSON.
- `POST /api/v1/ingest/structured`
  - **Payload**: Tabular files (CSV/Excel of GST returns, Bank Statements).
  - **Action**: Processes with Pandas, looks for circular trading, revenue inflation, and GSTR mismatches.

### B. The Research Agent

- `GET /api/v1/research/company/{company_id}`
  - **Payload**: Company Name or PAN.
  - **Action**: Triggers `duckduckgo-search` to blindly crawl recent news, MCA filings info, and sector headwinds (e.g., "RBI regulations NBFCs"). Uses LLM to cluster the raw HTML/text into actionable Risk Alerts.

### C. The Recommendation Engine

- `POST /api/v1/engine/primary-insights`
  - **Payload**: JSON containing Credit Officer notes (e.g., "Factory at 40% capacity").
  - **Action**: Overrides the base risk score with these qualitative inputs.
- `POST /api/v1/engine/generate-cam`
  - **Payload**: Application ID.
  - **Action**: Aggregates Data Ingestor JSON + Research Agent Alerts + Primary Insights. Passes everything into a master LangChain prompt to generate the 5 Cs of Credit (Character, Capacity, Capital, Collateral, Conditions).
  - **Returns**: The final drafted CAM along with suggested loan limits and interest rates.

---

## 3. Frontend Portal: What Will It Show?

The React/Vite Frontend (`/website`) serves as the "Digital Credit Manager" portal for the human Credit Officer.

### A. The Dashboard (Landing Page)

- **Pipeline Overview**: Displays stats like "Pending CAMs", "Approved this week", and "High Risk Alerts".
- **Recent Applications**: A list of borrowing companies in the pipeline and their current processing stage (e.g., "Pending Info: GSTR-3B Mismatch", "AI Pre-screening Complete").
- **Agent Intelligence alerts**: A real-time feed where the background Research Agent pushes findings (e.g., "Data Paradox Detected: Circular trading suspected for Zenith Metals").

### B. Document Upload & Ingestion View

- **Drag-and-Drop Area**: For officers to upload the 100+ page PDFs, Bank Statements, and GST filings.
- **Live Parsing Status**: A loading state that shows the AI extracting tables, parsing narratives, and finding anomalies in real-time.

### C. CAM Review & Recommendation Engine View

- **The 5 Cs Summary**: A split-screen view showing the synthesized AI output (Character, Capacity, Capital, Collateral, Conditions).
- **Primary Insight Input**: A text box where the Officer types their factory visit notes, which instantly recalculates the risk.
- **Final Decision Card**: Displays the AI's final recommendation (Approve/Reject), the suggested **Limit** (e.g., ₹50 Cr), the **Interest Rate Premium**, and most importantly, the **Explainable Logic** detailing exactly _why_ it made that decision based on the uploaded Indian-context data.
- **Export**: A button to download the finalized Word/PDF CAM for the credit committee.
