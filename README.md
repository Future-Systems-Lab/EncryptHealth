# EncryptHealth MVP

**EncryptHealth** is a decentralized digital health consent and data exchange prototype built for compliance, analytics, and DAO-based governance.  
This MVP demonstrates consent management, FHIR/HL7 data handling, and basic analytics using Web3 technologies.

---

## 🌐 MVP Components

| Module | Description | Demo |
|---------|--------------|------|
| **Frontend Dashboard** | MetaMask user login, practitioner login, and consent toggle. | ![Dashboard](web/public/dashboard.png) |
| **FHIR/HL7 Adapter** | Parses a mock FHIR Patient.json, verifies structure, and hashes identifiers for secure record linkage. | ![FHIR Adapter](web/public/fhir-demo.png) |
| **Analytics Module** | Displays mock consent events, token rewards, and summary metrics. | ![Analytics](web/public/analytics-demo.png) |

---

## ⚙️ Architecture Overview

- **Next.js + Tailwind** frontend (SSR)
- **Wagmi / Viem** wallet integration
- **FHIR/HL7 adapter** (mock data parsing and hashing)
- **Local data analytics** for consent activity
- Ready for extension into on-chain DAO governance and token rewards

\`\`\`mermaid
graph TD
  A[User/Practitioner Dashboard] --> B[Consent Toggle]
  B --> C[FHIR Adapter]
  C --> D[Hash Generator]
  D --> E[Analytics Summary]
\`\`\`

---

## 🧠 How to Run Locally

\`\`\`bash
cd web
pnpm install
pnpm exec next dev -p 3013
\`\`\`
Then open:
- Dashboard → http://localhost:3013  
- FHIR Adapter → http://localhost:3013/fhir  
- Analytics → http://localhost:3013/analytics

---

## 📍 Roadmap

- [x] Wallet login + consent toggle  
- [x] FHIR/HL7 mock adapter  
- [x] Analytics/visualization  
- [x] DAO smart contract linkage 
- [ ] Decentralized consent registry + on-chain audit trail (Phase 3 - planned)

---

© EncryptHealth | Future Systems Lab | Rights Reserved, Unlicensed
