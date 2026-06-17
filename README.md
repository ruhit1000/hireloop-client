# ♾️ HireLoop: The Modern Job Hunting Portal

HireLoop is a full-featured, high-performance job hunting platform that bridges the gap between job seekers and employers. Built with modern web technologies, the application streamlines job discovery, application management, and company recruitment—all inside a fast, data-driven system with a sleek, dark-themed dashboard workspace.

---

## 🚀 Key Architectural Highlights
* **Optimized Data Pipeline:** Real-time multi-collection aggregations (e.g., dynamic live tracking of active job counts per company during directory indexing).
* **Robust Next.js Hydration & Routing:** Leverages parallel route mechanics (e.g., `(main)` and `(dashboard)` un-named layout groups) along with unified root catch-all pages (`loading.js`, `not-found.js`).
* **Advanced State & Filter Synchronization:** Seamless client-to-server filter handshakes via absolute browser pathname query injection, allowing instant search tracking without rendering layout loops.
* **Component Modularity:** Decoupled, atomized structures built with Tailwind CSS utility parameters to enforce maintainable code.

---

## 👥 User Roles & Workflow Ecosystem

The system isolates operations into three distinct client roles to maintain absolute platform integrity:

### 1. 🔍 Job Seeker
* **Profile Engine:** Interactive profile spaces containing skills taggers, biographies, resumes (PDF files), and headline management.
* **Application Lifecycle:** Instant single-click apply triggers alongside a step-by-step submission confirmation tracking grid.
* **Tier Constraints:** Scaled usage boundaries tracking monthly applications and bookmarks matching the active payment profile.

### 2. 👔 Recruiter
* **Company Registration:** Isolated onboarding requiring administrative system clearance before becoming public.
* **Job Post Manager:** Dynamic management tables supporting creation, toggling (Active vs. Closed), and editing with plan limit counters.
* **Applicant Tracking System (ATS):** Contextual drop-down controls facilitating phase transitions (*Applied ➔ Under Review ➔ Shortlisted ➔ Offered / Rejected*) accompanied by automatic email dispatch.

### 3. 🛡️ System Administrator
* **Ecosystem Moderation:** Control tables to adjust active global statuses of organizations and users.
* **Revenue Metrics:** Financial transaction tables recording platform parameters (Total Revenue, Subscription tiers, and Transaction Hashes).

---

## 💳 Monitored Subscription Structure

HireLoop leverages deep Stripe webhook integration to process tiered access limits across dual user groups:

### Job Seeker Tiers
| Tier Name | Price | Application Threshold | Extras Included |
| :--- | :--- | :--- | :--- |
| **Free** | $0/forever | 3 submissions / month | Basic profile features, Email alerts |
| **Pro** | $19/month | 30 submissions / month | Application tracking, Salary insights |
| **Premium** | $39/month | Unlimited | Profile boost, Early access listings |

### Recruiter Tiers
| Tier Name | Price | Active Posting Cap | Metrics Availability |
| :--- | :--- | :--- | :--- |
| **Free** | $0/forever | Max 3 active posts | Standard visibility configuration |
| **Growth** | $49/month | Max 10 active posts | Basic data visualization |
| **Enterprise** | $149/month | Max 50 active posts | Advanced data instrumentation panels |

---

## 🛠️ Technology Stack & Dependencies

### Core Frameworks
* **Frontend Runtime:** Next.js (App Router Architecture)
* **Backend Runtime:** Node.js with Express.js Framework
* **Database Driver:** MongoDB Native Driver
* **Payment Processing:** Stripe Node SDK & Checkout Links

### Design & Interface
* **Styling Core:** Tailwind CSS (Utility-first approach)
* **Component Library:** HeroUI Core
* **Iconography:** Lucide React

---

## 📁 System Core Folder Layout

```text
├── src/
│   ├── app/                               # Next.js Server Components Base Route Group
│   │   ├── (main)/                        # Un-named Routing Group: Public Facing Pages
│   │   │   ├── companies/                 # Company Directory Layout
│   │   │   │   ├── [id]/                  # Dynamic Path: Company Details Profile Page
│   │   │   │   └── page.jsx               
│   │   │   └── jobs/                      # Public Jobs Layout
│   │   ├── (dashboard)/                   # Un-named Routing Group: Authenticated Spaces
│   │   │   ├── seeker/                    # Seeker Core Views (Settings, Billing)
│   │   │   └── recruiter/                 # Recruiter Core Views (Manage Jobs, Company Form)
│   │   ├── loading.jsx                    # Automated Global Skeleton Hydration Page
│   │   ├── not-found.jsx                  # Global Catch-all 404 Route UI Page
│   │   └── layout.js                      # Root HTML document initialization shell
│   ├── components/                        # Granular Component Repository
│   │   ├── Company/                       # Card and Filter elements for Companies
│   │   ├── Dashboard/                     # Sub-modular layout widgets for Settings / Forms
│   │   └── Shared/                        # Platform-wide layouts (Modals, Alerts)
│   ├── lib/
│   │   └── api/                           # Data-fetching API orchestration modules
```

## ⚙️ Local Configuration & Installation

### 1. Repository Setup
```bash
git clone https://github.com/ruhit1000/hireloop.git
cd hireloop
```

### 2. Environment Configuration
Create an `.env.local` file in your root folder for the frontend, and an `.env` file in your backend server location:

**Backend Configuration (`server/.env`):**
```env
PORT=5000
MONGODB_URI=mongodb+srv://:@cluster.mongodb.net/hireloop
STRIPE_SECRET_KEY=sk_test_...
```

**Frontend Configuration (`.env.local`):**
```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

### 3. Execution Engines
```bash
# To launch your server ecosystem:
cd server && npm install
npm run dev

# To launch your client compilation environment:
cd client && npm install
npm run dev
```

