# CreditSense Setup

## Installation & Setup

### Backend (FastAPI Server)

The backend exposes the LLM AI Engine endpoints on `http://127.0.0.1:8000`.

1. Navigate to the `servers` directory:
   ```bash
   cd servers
   ```
2. Create a Python virtual environment:
   ```bash
   python -m venv venv
   ```
3. Activate the virtual environment:
   - **macOS/Linux**:
     ```bash
     source venv/bin/activate
     ```
   - **Windows PowerShell**:
     ```powershell
     .\venv\Scripts\Activate.ps1
     ```
   - **Windows Command Prompt**:
     ```cmd
     venv\Scripts\activate.bat
     ```
4. Install the required dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Set up your environment variables:
   - Create a `.env` file from the example.
     - **macOS/Linux**:
       ```bash
       cp .env.example .env
       ```
     - **Windows**:
       ```cmd
       copy .env.example .env
       ```
   - Open `.env` and add your valid `GEMINI_API_KEY`.
6. Run the FastAPI development server:
   ```bash
   uvicorn main:app --reload
   ```

### Frontend (React/Vite Website)

The frontend is a React application that provides the "Digital Credit Manager" portal.

1. Open a **new terminal tab** and navigate to the `website` directory:
   ```bash
   cd website
   ```
2. Install the Node.js packages:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to the link provided by Vite (usually `http://localhost:5173`).

## Testing

### Research Agent

```bash
curl -X 'GET' \
  'http://127.0.0.1:8000/api/v1/research/company/paytm' \
  -H 'accept: application/json'
```

#### Output

```json
{
  "status": "success",
  "data": {
    "overall_sentiment": "Negative",
    "risk_alerts": [
      {
        "category": "Regulatory",
        "description": "The Reserve Bank of India (RBI) imposed major restrictions on Paytm Payments Bank Limited (PPBL), prohibiting it from accepting new deposits, credit transactions, or top-ups in customer accounts and wallets due to persistent non-compliance.",
        "severity": "High"
      },
      {
        "category": "Governance",
        "description": "Significant board restructuring, including the resignation of founder Vijay Shekhar Sharma from the board of Paytm Payments Bank, following intense regulatory scrutiny and compliance failures.",
        "severity": "High"
      },
      {
        "category": "Operational",
        "description": "Termination of inter-company agreements between One 97 Communications (OCL) and Paytm Payments Bank, necessitating a total shift in the business model to rely on third-party banking partners for UPI and nodal accounts.",
        "severity": "Medium"
      },
      {
        "category": "Financial",
        "description": "Anticipated impairment of revenue and profitability in the short-to-medium term as the company loses its integrated banking-wallet ecosystem and faces potential churn in its merchant and customer base.",
        "severity": "Medium"
      }
    ],
    "positive_indicators": [
      "NPCI approval for Paytm to operate as a Third-Party Application Provider (TPAP) for UPI.",
      "Successful migration of users and merchants to partner banks (Axis Bank, HDFC Bank, SBI, and YES Bank).",
      "Continued growth in the loan distribution business and insurance vertical.",
      "Strong cash reserves on the balance sheet providing a cushion for business transition."
    ]
  }
}
```

### CAM Generator

```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/api/v1/engine/generate-cam' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "application_id": "APP-12345",
  "company_data": {
    "name": "Paytm",
    "financials": {
      "revenue": "1000 Cr",
      "profit": "100 Cr",
      "debt": "500 Cr"
    }
  },
  "research_data": {
    "news": "Paytm is facing regulatory issues",
    "mca_filings": "Paytm has filed for bankruptcy"
  },
  "primary_insights": "Paytm is a good company with strong fundamentals"
}'
```

#### Output

```json
{
  "status": "success",
  "data": {
    "overall_decision": "Reject",
    "suggested_limit_cr": 0,
    "interest_rate_premium_bps": 0,
    "explainable_logic": "The company is currently facing severe regulatory sanctions from the RBI, which prohibit it from accepting new deposits and conducting core banking activities. While the company has a strong market position in digital payments and a robust merchant ecosystem, the lack of a banking license and the ongoing compliance issues make it a high-risk proposition for new credit facilities. The suggested limit is zero until the regulatory situation is fully resolved and the company demonstrates a sustainable path to profitability without its banking license.",
    "five_cs_summary": {
      "character": "Questionable due to persistent regulatory non-compliance and governance issues.",
      "capacity": "Severely impaired by RBI restrictions on core banking activities.",
      "capital": "Adequate cash reserves provide a buffer, but profitability is at risk.",
      "collateral": "Not applicable as the company is currently unlendable.",
      "conditions": "Unfavorable due to regulatory uncertainty and operational restructuring."
    },
    "key_risk_mitigants": [
      "Successful migration to partner banks (Axis, HDFC, SBI, YES Bank).",
      "Strong brand recognition and merchant relationships.",
      "Continued growth in loan distribution and insurance verticals."
    ]
  }
}
```

### Document Ingestion

First, make sure to generate your dummy financial report PDF by running `python3 create_test_pdf.py` in the `servers` directory. That script will create the `test_report.pdf` file.

Then, you can run the following curl command in a new terminal:

```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/api/v1/ingest/document' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@test_report.pdf;type=application/pdf'
```

### End-to-End Testing (Paytm Report)

To test the entire pipeline (Ingestion -> Research -> CAM Generator) securely without formatting or escaping issues on the command line, we recommend using the `test_e2e.py` Python script.

Make sure you have generated the test PDF by running `python3 generate_paytm_pdf.py` first.

#### Method 1: Python Script (Recommended)

Run the automated script natively in your terminal inside the `servers` directory:

```bash
python3 test_e2e.py
```

This script will automatically hit the endpoints in sequence and pipe the outputs exactly as required.

#### Method 2: Manual cURL

If you want to run the End-to-End flow manually, perform these 3 steps in order:

**1. Document Ingestion (Extractor Agent)**

```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/api/v1/ingest/document' \
  -H 'accept: application/json' \
  -H 'Content-Type: multipart/form-data' \
  -F 'file=@paytm_report.pdf;type=application/pdf'
```

_(Copy the JSON output from this step)_

**2. The Research Agent**

```bash
curl -X 'GET' \
  'http://127.0.0.1:8000/api/v1/research/company/Paytm' \
  -H 'accept: application/json'
```

_(Copy the JSON output from this step)_

**3. The Recommendation Engine (CAM Generator)**
Form a valid JSON object by replacing the placeholders below with the JSON blocks copied from Step 1 and Step 2.

```bash
curl -X 'POST' \
  'http://127.0.0.1:8000/api/v1/engine/generate-cam' \
  -H 'accept: application/json' \
  -H 'Content-Type: application/json' \
  -d '{
  "application_id": "APP-PAYTM-001",
  "company_data": {
    "company_name": "One97 Communications Limited",
    "total_revenue": null,
    "net_profit": null,
    "key_covenants": null,
    "identified_risks": [
      "Regulatory action by the Reserve Bank of India (RBI)"
    ]
  },
  "research_data": {
    "overall_sentiment": "Negative",
    "risk_alerts": []
  },
  "primary_insights": "The company has a highly resilient merchant base despite recent setbacks. They hold substantial cash reserves and are quickly onboarding alternate banking partners."
}'
```
