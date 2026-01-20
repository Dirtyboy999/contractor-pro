# Contractor Pro

[![Render Deployment Status](https://img.shields.io/badge/Deployed%20on-Render-46E3B7?logo=render)](https://contractor-pro-35pj.onrender.com)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](./LICENSE)

**Contractor Pro** is a robust, full-stack business management platform designed specifically for contractors and service-based businesses. It provides a comprehensive suite of tools to manage the entire project lifecycle—from lead generation and professional bidding to financial reporting and client management.

Built with a modern, type-safe stack, Contractor Pro ensures high performance, scalability, and a seamless user experience across its web and mobile-responsive interfaces.

## ✨ Key Features

| Feature | Description |
| :--- | :--- |
| **Project Management** | Track projects from start to finish with detailed status updates, photo galleries, and scheduling. |
| **Bidding & Estimates** | Create professional, line-item bids and estimates. Convert accepted bids directly into active projects or invoices. |
| **Financial Suite** | Manage invoices, track expenses, process payments via Stripe, and generate detailed financial reports. |
| **Team & Payroll** | Manage employees, track time, and handle payroll operations within a single dashboard. |
| **AI-Powered Insights** | Smart suggestions engine for proactive business recommendations and market intelligence. |
| **Client Portal** | A dedicated interface for clients to view project progress, approve bids, and pay invoices securely. |
| **White-Label Ready** | Full multi-tenant support for white-labeling, allowing for custom branding, logos, and domains. |
| **Advanced Scheduling** | Drag-and-drop scheduling with map integration for efficient route and crew management. |

## 🛠️ Tech Stack

| Component | Technology |
| :--- | :--- |
| **Frontend** | React 19, Vite, Tailwind CSS 4, Radix UI, Framer Motion |
| **Backend** | Node.js (Express), tRPC (Type-safe API) |
| **Database** | PostgreSQL / MySQL (via Drizzle ORM) |
| **API Layer** | tRPC for end-to-end type safety |
| **Infrastructure** | Render (Deployment), AWS S3 (Storage), Stripe (Payments) |
| **State Management** | TanStack Query (React Query) |

## 🚀 Getting Started

### Prerequisites

*   **Node.js** (v20 or higher)
*   **pnpm** (v10 or higher)
*   **PostgreSQL** or **MySQL** database

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/Dirtyboy999/contractor-pro.git
    cd contractor-pro
    ```
2.  **Install dependencies:**
    ```bash
    pnpm install
    ```
3.  **Environment Setup:**
    Create a `.env` file in the root directory and add your configuration:
    ```env
    DATABASE_URL=your_database_url
    JWT_SECRET=your_jwt_secret
    STRIPE_SECRET_KEY=your_stripe_key
    OPENAI_API_KEY=your_openai_key
    ```
4.  **Database Migration:**
    ```bash
    pnpm db:push
    ```

### Running the App

*   **Development:** `pnpm dev`
*   **Production Build:** `pnpm build`
*   **Start Production:** `pnpm start`

## ☁️ Deployment

This project is optimized for deployment on **Render**. The `render.yaml` file defines the necessary services, including the web service and database configurations.

The live application is accessible at: [https://contractor-pro-35pj.onrender.com](https://contractor-pro-35pj.onrender.com)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

---
*Maintained by [Dirtyboy999](https://github.com/Dirtyboy999).*
