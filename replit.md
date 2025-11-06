# Kutty Port - AI + IoT Export Logistics Platform

## Overview
Kutty Port is a comprehensive export logistics platform designed for MSMEs (Micro, Small & Medium Enterprises). The platform connects small exporters with global markets through intelligent AI-powered logistics, real-time tracking, and seamless support from doorstep to port.

**Theme**: "Think Local, Ship Global"

## Project Architecture

### Technology Stack
- **Frontend**: React + TypeScript with Vite
- **Backend**: Express.js + Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Replit Auth (OpenID Connect)
- **UI Framework**: Tailwind CSS + Shadcn UI
- **AI**: OpenAI GPT-5 for customer support chatbot
- **Charts**: Recharts for analytics visualization

### Design System
- **Primary Color**: Deep Blue (#003366 / HSL: 210 100% 20%)
- **Accent Color**: Aqua Green (#00C4B3 / HSL: 178 100% 38%)
- **Fonts**: 
  - Primary: Poppins (headings, titles)
  - Secondary: Inter (body text, UI)
  - Mono: Roboto Mono (data, tracking numbers)
- **Border Radius**: 16px+ for cards, buttons
- **Shadows**: Soft, subtle shadows throughout

## Features

### Public Website
1. **Home Page** - Hero banner, services grid, client carousel, hub model visualization
2. **About Page** - Vision, mission, core values, company journey timeline
3. **Platform Page** - Portal selection for different user roles
4. **Technology Page** - AI/IoT tech stack showcase
5. **Contact Page** - Contact form and location information

### Role-Based Dashboards

#### Customer Dashboard
- Shipment booking workflow (pickup → package → documents → payment)
- Real-time tracking with interactive maps
- Invoice management
- AI-powered chatbot assistant
- Insurance options
- Support ticket system

#### Delivery Partner Dashboard (Planned)
- Onboarding with document upload (license, RC)
- Shift selection (Customer↔Hub or Hub↔Hub)
- Route assignments with AI optimization
- Earnings and incentive tracking
- Performance scoring

#### Employee Dashboard (Planned)
- Hub operations management
- Shipment status updates
- Delivery partner assignments
- Customer query handling
- Performance reports

#### Admin Dashboard (Planned)
- Complete system overview
- User and partner approvals
- AI analytics panels (revenue, efficiency)
- Hub management
- System-wide controls

## Database Schema

### Core Tables
- `users` - User accounts with role-based access (customer, delivery_partner, employee, admin)
- `sessions` - Session storage for authentication
- `hubs` - Local, regional, and port hub locations
- `shipments` - Export shipment records with tracking
- `delivery_partners` - Delivery partner profiles and status
- `tracking_history` - Shipment location and status history
- `routes` - Delivery assignments and route tracking
- `support_tickets` - Customer support requests

## Recent Changes (November 2024)
- Initial project setup with fullstack TypeScript template
- Implemented complete database schema with Drizzle ORM
- Created all public website pages with responsive design
- Built authentication system with Replit Auth
- Designed customer dashboard with data visualization
- Configured custom color palette (Deep Blue + Aqua Green)
- Set up design guidelines for consistent UI/UX

## User Preferences
- Follow design_guidelines.md strictly for all frontend work
- Use semantic color tokens from tailwind.config.ts
- Maintain consistent spacing and typography
- Prioritize visual excellence and user experience

## Next Steps
1. Complete backend API implementation
2. Integrate frontend with backend APIs
3. Implement AI chatbot for customer support
4. Add real-time tracking functionality
5. Build remaining dashboards for all user roles
6. Add payment integration
7. Implement notification system (email/SMS)
