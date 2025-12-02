# Smart Classroom & Timetable Scheduler

An AI-powered timetable scheduling solution for higher education institutions, developed for the Government of Jharkhand.

## Features

- **AI-Powered Optimization**: Advanced algorithms ensure maximum utilization of classrooms and faculty time.
- **Multi-Department Support**: Manage timetables across multiple departments and shifts.
- **Real-Time Adjustments**: Handle faculty leaves and schedule changes with intelligent rearrangement.
- **Analytics & Insights**: Track utilization metrics and identify optimization opportunities.

## Tech Stack

- **Frontend**: React, Vite, TypeScript, Tailwind CSS, shadcn/ui
- **Backend/Database**: Supabase
- **Charts**: Recharts

## Getting Started

### Prerequisites

Ensure you have Node.js & npm installed.

### Installation

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Environment Setup:**
    Ensure you have a `.env` file in the root directory with your Supabase credentials:
    ```env
    VITE_SUPABASE_URL=your_supabase_url
    VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_key
    ```

3.  **Run Development Server:**
    ```bash
    npm run dev
    ```

4.  **Build for Production:**
    ```bash
    npm run build
    ```

## License

All rights reserved. © 2025 Smart Classroom Timetable Scheduler.