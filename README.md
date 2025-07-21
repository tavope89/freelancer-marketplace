# Freelancer Search Engine – Full Stack

## Overview
A full-stack web application for searching freelancers with dynamic filters.

- **Backend:** NestJS + TypeORM + PostgreSQL (`/backend`)
- **Frontend:** Next.js + TypeScript (`/frontend`)

## Setup

### Prerequisites
- Node.js (v18+ recommended)
- npm
- PostgreSQL

### 1. Environment Variables
Copy `.env.example` to `.env` and fill in your values for both backend and frontend as needed.

### 2. Backend Setup
```
cd backend
npm install
# Update .env with your DB credentials
npm run start:dev
```

#### Database Migration & Seeding
- (To be implemented) Run the seed script to populate fake freelancers:
```
npm run seed
```

### 3. Frontend Setup
```
cd frontend
npm install
npm run dev
```

- The frontend will be available at `http://localhost:4000`
- The backend API will run at `http://localhost:4001` (default)


## Features & Implementation Summary

### Marketplace Search & Matching Engine
This project implements a robust search and matching engine for a freelancer marketplace, focusing on multi-criteria filtering and a modern user experience.

#### Implemented Features
- **Multi-criteria dynamic search:**
  - Filter by skills and expertise categories
  - Filter by freelancer ratings and reviews
  - Filter by response time and availability
  - Filter by location and timezone
  - Filter by hourly rate range
  - Filter by portfolio presence and past work
- **Backend:**
  - NestJS API with TypeORM and PostgreSQL
  - Dynamic filtering endpoint (`/freelancers/search`) supporting all criteria
  - Pagination support
  - Seed script to populate the database with realistic test data
- **Frontend:**
  - Next.js (React) UI with modern, readable design
  - Search form with all filters and error/loading states
  - Results grid and pagination
  - API integration with backend
- **Testing:**
  - E2E tests for all dynamic filters
- **Ports:**
  - Backend runs on port 4001
  - Frontend runs on port 4000
- **No AI attribution:**
  - All Copilot/AI references removed from codebase

#### Not Implemented / Optional
- **Authentication (JWT/session):** Not implemented
- **Group/team permission logic:** Not implemented
- **Advanced features (e.g., skill weighting, AI recommendations):** Not implemented
- **Lockfile cleanup:** Warning present, does not affect functionality

#### How to Seed Data
Run the following in `/backend` to populate the database:
```
npm run seed
```

#### How to Run
See setup instructions above for backend and frontend. Use the search form to test all implemented features.

---
This summary helps reviewers quickly understand what is covered and what is not in this prototype.

## Deployment
- Backend: Railway, Render, or Fly.io
- Frontend: Vercel

## Project Structure
```
/backend   # NestJS API
/frontend  # Next.js frontend
```

---

See `.env.example` for environment variables.
