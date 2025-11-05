# Mahallu Connect - Build Guide

A mobile-first community web app for Kerala Mahallu system, featuring financial transparency, survey insights, job opportunities, and announcements.

## 🎯 Project Overview

**App Name:** Mahallu Connect
**Purpose:** Community management platform for Kerala Mahallu system
**Tech Stack:** React + TypeScript + Vite + Tailwind CSS + Supabase
**Design:** Mobile-first with bottom navigation

## 📋 Step-by-Step Implementation

### Step 1: Project Setup & Dependencies
- ✅ Initialize Vite + React + TypeScript project
- ✅ Configure Tailwind CSS
- ✅ Install Lucide React for icons
- ✅ Install Supabase client

### Step 2: Design System & Theme
- Set primary color: `#0F766E` (Teal)
- Set accent color: `#FACC15` (Yellow)
- Use Inter font family
- Create mobile-first responsive layout

### Step 3: Layout Components
**3.1 Top Navigation Bar**
- App title: "Mahallu Connect"
- Fixed position at top
- Clean, minimal design

**3.2 Bottom Navigation Bar**
- 5 tabs: Home, Reports, Survey, Jobs, Events
- Icons from lucide-react
- Active state indication
- Fixed position at bottom

### Step 4: Pages & Features

#### 4.1 Dashboard (Home) `/`
- Grid layout (2 columns on mobile)
- 4 navigation cards:
  - Financial Reports (bar-chart icon)
  - Survey Insights (pie-chart icon)
  - Jobs & Opportunities (briefcase icon)
  - Announcements & Events (calendar icon)

#### 4.2 Financial Reports `/reports`
- Annual financial overview (bar chart)
  - Income, Expense, Donation data for 2023-2024
- Recent financial entries table
  - Date, Description, Amount columns
- Download PDF report button

#### 4.3 Survey Insights `/survey`
- Statistics cards:
  - Total Households: 235
  - Unemployed Youth: 23%
  - Families Below Poverty: 18%
  - Average Income: ₹32,000
- Education distribution pie chart
- Zone filter dropdown

#### 4.4 Jobs & Opportunities `/jobs`
- Job listing cards:
  - Electrician - Dubai (AED 2500)
  - Driver - Riyadh (SAR 2800)
  - Cook - Doha (QAR 3000)
- WhatsApp contact integration
- Post new job button (admin)

#### 4.5 Announcements & Events `/events`
- Latest announcements list:
  - Community Meeting
  - Charity Drive
  - Obituary notices
- Upcoming events calendar


### Step 5: Database Schema (Supabase)

**5.1 Financial Reports Table**
```sql
- id (uuid, primary key)
- date (date)
- description (text)
- amount (numeric)
- category (text: income/expense/donation)
- created_at (timestamp)
```

**5.2 Jobs Table**
```sql
- id (uuid, primary key)
- title (text)
- location (text)
- country (text)
- salary (text)
- contact (text)
- description (text)
- posted_date (timestamp)
- status (text: active/filled)
```

**5.3 Announcements Table**
```sql
- id (uuid, primary key)
- title (text)
- type (text: event/notice/obituary)
- description (text)
- date (date)
- location (text, optional)
- created_at (timestamp)
```

**5.4 Survey Data Table**
```sql
- id (uuid, primary key)
- total_households (integer)
- unemployed_percentage (numeric)
- poverty_percentage (numeric)
- average_income (numeric)
- education_distribution (jsonb)
- zone (text)
- last_updated (timestamp)
```

### Step 6: Chart Components
- Bar chart for financial overview
- Pie chart for education distribution
- Responsive and mobile-friendly

### Step 7: Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px)
- Touch-friendly buttons and navigation
- Optimized for portrait orientation

### Step 8: Data Integration
- Connect Supabase client
- Fetch data for all pages
- Handle loading states
- Error handling

### Step 9: Interactive Features
- Bottom navigation routing
- Card navigation from dashboard
- WhatsApp integration for job contacts
- Filter functionality for surveys
- Modal for posting jobs (admin)

### Step 10: Polish & Production
- Add loading spinners
- Implement error boundaries
- Optimize performance
- Test on multiple devices
- Add meta tags for SEO

## 🎨 Color Palette

- **Primary (Teal):** `#0F766E`
- **Accent (Yellow):** `#FACC15`
- **Background:** `#FFFFFF`
- **Text Primary:** `#1F2937`
- **Text Secondary:** `#6B7280`
- **Border:** `#E5E7EB`

## 📱 Mobile-First Design Principles

1. Bottom navigation for easy thumb access
2. Large tap targets (min 44px)
3. Readable font sizes (16px minimum)
4. Adequate spacing between elements
5. Progressive enhancement for larger screens

## 🔐 Security Considerations

- Row Level Security (RLS) on all Supabase tables
- Admin authentication for job posting
- Secure contact information handling
- Data validation on all inputs

## 🚀 Future Enhancements

- Community Directory with search
- Push notifications for announcements
- Multi-language support (Malayalam, English)
- Dark mode toggle
- Offline support with PWA
- Advanced analytics dashboard
- Member authentication system

## 📊 Sample Data Structure

### Financial Entry
```json
{
  "date": "2024-10-01",
  "description": "Mosque Maintenance",
  "amount": 15000,
  "category": "expense"
}
```

### Job Posting
```json
{
  "title": "Electrician",
  "location": "Dubai",
  "country": "UAE",
  "salary": "AED 2500",
  "contact": "+971 55 324 6789"
}
```

### Announcement
```json
{
  "title": "Community Meeting",
  "type": "event",
  "date": "2024-11-10",
  "description": "At Mahallu Hall, 7 PM"
}
```

## ✅ Implementation Checklist

- [ ] Set up routing system
- [ ] Create layout components (TopNav, BottomNav)
- [ ] Build dashboard with navigation cards
- [ ] Implement financial reports page with charts
- [ ] Create survey insights with statistics
- [ ] Build jobs listing with WhatsApp integration
- [ ] Develop announcements and events page
- [ ] Set up Supabase database
- [ ] Create database migrations
- [ ] Connect frontend to backend
- [ ] Test responsive design
- [ ] Optimize performance
- [ ] Deploy to production

---

**Built with ❤️ for Kerala Mahallu communities**


Full prompt: {
  "app": {
    "name": "Mahallu Connect",
    "description": "A mobile-first community web app demo for Kerala Mahallu system, showing financial transparency, survey insights, job opportunities, and announcements.",
    "theme": {
      "primaryColor": "#0F766E",
      "accentColor": "#FACC15",
      "backgroundColor": "#FFFFFF",
      "font": "Inter"
    },
    "layout": {
      "type": "mobile-first",
      "navigation": {
        "topbar": {
          "title": "Mahallu Connect"
        },
        "bottombar": {
          "tabs": [
            { "label": "Home", "icon": "home" },
            { "label": "Reports", "icon": "bar-chart" },
            { "label": "Survey", "icon": "pie-chart" },
            { "label": "Jobs", "icon": "briefcase" },
            { "label": "Events", "icon": "calendar" }
          ]
        }
      }
    }
  },

  "pages": [
    {
      "name": "Dashboard",
      "path": "/",
      "layout": "grid",
      "columns": 2,
      "cards": [
        { "title": "Financial Reports", "icon": "bar-chart", "link": "/reports" },
        { "title": "Survey Insights", "icon": "pie-chart", "link": "/survey" },
        { "title": "Jobs & Opportunities", "icon": "briefcase", "link": "/jobs" },
        { "title": "Announcements & Events", "icon": "calendar", "link": "/events" }
      ]
    },

    {
      "name": "Financial Reports",
      "path": "/reports",
      "sections": [
        {
          "type": "chart",
          "title": "Annual Financial Overview",
          "chartType": "bar",
          "data": [
            { "year": "2024", "income": 450000, "expense": 390000, "donation": 60000 },
            { "year": "2023", "income": 420000, "expense": 370000, "donation": 50000 }
          ],
          "xField": "year",
          "yFields": ["income", "expense", "donation"]
        },
        {
          "type": "table",
          "title": "Recent Financial Entries",
          "columns": ["Date", "Description", "Amount"],
          "data": [
            { "Date": "2024-10-01", "Description": "Mosque Maintenance", "Amount": "₹15,000" },
            { "Date": "2024-10-15", "Description": "Charity to Poor Families", "Amount": "₹20,000" },
            { "Date": "2024-11-01", "Description": "Community Iftar Event", "Amount": "₹10,000" }
          ]
        },
        {
          "type": "button",
          "label": "Download PDF Report",
          "style": "primary",
          "action": "none"
        }
      ]
    },

    {
      "name": "Survey Insights",
      "path": "/survey",
      "sections": [
        {
          "type": "stats",
          "items": [
            { "label": "Total Households", "value": "235" },
            { "label": "Unemployed Youth", "value": "23%" },
            { "label": "Families Below Poverty", "value": "18%" },
            { "label": "Average Income", "value": "₹32,000" }
          ]
        },
        {
          "type": "chart",
          "title": "Education Distribution",
          "chartType": "pie",
          "data": [
            { "label": "Primary", "value": 30 },
            { "label": "Secondary", "value": 40 },
            { "label": "Graduate", "value": 20 },
            { "label": "Post-Graduate", "value": 10 }
          ],
          "xField": "label",
          "yField": "value"
        },
        {
          "type": "dropdown",
          "label": "Filter by Zone",
          "options": ["All Zones", "East Ward", "West Ward", "North Ward"]
        }
      ]
    },

    {
      "name": "Jobs & Opportunities",
      "path": "/jobs",
      "sections": [
        {
          "type": "list",
          "title": "Available Jobs",
          "items": [
            {
              "title": "Electrician - Dubai",
              "subtitle": "UAE | AED 2500",
              "description": "Contact: +971 55 324 6789",
              "button": { "label": "Contact", "action": "openWhatsapp:+971553246789" }
            },
            {
              "title": "Driver - Riyadh",
              "subtitle": "Saudi Arabia | SAR 2800",
              "description": "Contact: +966 50 876 1234",
              "button": { "label": "Contact", "action": "openWhatsapp:+966508761234" }
            },
            {
              "title": "Cook - Doha",
              "subtitle": "Qatar | QAR 3000",
              "description": "Contact: +974 33 221 4567",
              "button": { "label": "Contact", "action": "openWhatsapp:+974332214567" }
            }
          ]
        },
        {
          "type": "button",
          "label": "Post New Job (Admin)",
          "style": "secondary",
          "action": "openModal"
        }
      ]
    },

    {
      "name": "Announcements & Events",
      "path": "/events",
      "sections": [
        {
          "type": "list",
          "title": "Latest Announcements",
          "items": [
            {
              "title": "Community Meeting",
              "subtitle": "Event | 2024-11-10",
              "description": "At Mahallu Hall, 7 PM"
            },
            {
              "title": "Charity Drive",
              "subtitle": "Notice | 2024-11-15",
              "description": "Collecting funds for flood victims"
            },
            {
              "title": "In memory of Haji Abdul Rahman",
              "subtitle": "Obituary | 2024-11-03",
              "description": "Funeral held at 5 PM"
            }
          ]
        },
        {
          "type": "calendar",
          "title": "Upcoming Events",
          "events": [
            { "title": "Mahallu Gathering", "date": "2024-11-25" },
            { "title": "Education Fund Review", "date": "2024-12-02" }
          ]
        }
      ]
    },

    {
      "name": "Community Directory",
      "path": "/directory",
      "sections": [
        {
          "type": "placeholder",
          "title": "Community Directory",
          "description": "Coming soon — Search members by name, ward, or occupation."
        }
      ]
    }
  ]
}
