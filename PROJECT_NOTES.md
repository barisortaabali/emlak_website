# Turkish Real Estate Website - Project Documentation

## Overview
A modern, premium Turkish real estate website built with React, TypeScript, Tailwind CSS, and Supabase. Features dynamic property request forms for both buyers (Alım) and sellers (Satım).

## Project Structure

### Components (`src/components/`)
- **Hero.tsx** - Landing section with company logo, tagline, and CTA buttons (Sahibinden & WhatsApp)
- **PropertyForm.tsx** - Main form component with dynamic field rendering based on request type and property type
- **FormToggle.tsx** - Toggle switch between Alım (Buy) and Satım (Sell) modes
- **FormSection.tsx** - Reusable form field wrapper with label and error display
- **AboutUs.tsx** - About section with company values and benefits

### Admin Components (`src/components/admin/`)
- **AdminLogin.tsx** - Premium login screen with email/password authentication
- **AdminPanel.tsx** - Main admin dashboard for viewing and managing property requests
- **ApplicationCard.tsx** - Individual application card with details, contact info, and delete button
- **ConfirmDialog.tsx** - Reusable confirmation modal for destructive actions

### Database (Supabase)
- **property_requests** table - Stores all form submissions
  - Columns: id, request_type, property_type, property_subtype, room_count, square_meters, location, description, full_name, phone, whatsapp, created_at
  - RLS enabled with public insert and authenticated read access

### Styling
- **Tailwind CSS** with custom theme extensions
- **Plus Jakarta Sans** font for modern, premium feel
- Light color palette with soft rounded corners (iPhone-inspired UI)
- Smooth transitions and hover effects

## Features

### Form Logic
1. **Toggle between Alım (Buy) and Satım (Sell)**
2. **Select Property Type (Konut/Arazi)**
3. **Dynamic Field Rendering**
   - For Konut: Displays room count, housing type options
   - For Arazi: Displays land type options
4. **Form Validation** - All required fields validated with Turkish error messages
5. **Data Persistence** - Submissions saved to Supabase automatically
6. **Success/Error Feedback** - Visual feedback after submission

### Design Elements
- Premium soft UI with rounded corners
- Light color scheme (white, light gray, soft blue)
- Subtle shadows and smooth transitions
- Mobile-first responsive design
- Clear visual hierarchy
- Elegant button states and focus effects

## Key Components Details

### PropertyForm
- Two-step form process: Select property type → Fill details
- Conditional field display based on property type
- Real-time validation with Turkish messages
- Loading state during submission
- Success message display with auto-clear

### Hero Section
- Centered company logo with premium styling
- Turkish tagline emphasizing trust and professionalism
- Two prominent CTA buttons
- Responsive button layout (stack on mobile)

### About Us Section
- Company mission and values
- Four key benefit cards (Security, Customer-focused, Expert team, Quick response)
- Call-to-action button
- Footer with contact info

## Database Security
- Row Level Security (RLS) enabled
- Public insert policy for anonymous form submissions
- Authenticated read policy for staff access
- Proper field constraints and validation

## Admin Panel Features

### Authentication
- Supabase email/password authentication
- Secure session management
- Auto-detection of existing sessions
- Premium login interface matching website design

### Application Management
- List all submitted property requests in reverse chronological order
- Auto-refresh every 5 seconds to show new submissions
- Color-coded badges for request type and property type
- Detailed application cards showing all submission information
- Delete functionality with confirmation dialog
- Empty state when no applications exist
- Error handling and user feedback

### Application Card Details
Each application displays:
- Request type (Satın Alma / Satış)
- Property type (Konut / Arazi)
- Property subtype and room count
- Square meters and location
- Full contact information with clickable links
- WhatsApp link (if provided)
- Submission timestamp
- Description/notes

### UX Features
- Loading states for initial data fetch and deletion
- Confirmation dialog prevents accidental deletion
- Real-time error alerts
- Responsive grid layout
- Smooth animations and transitions
- Logout functionality

## Database Security
- Row Level Security (RLS) enabled on property_requests table
- Public insert policy for anonymous form submissions
- Authenticated read/delete policies for admin staff only
- Proper field constraints and validation

## Routing
- Home page: `/` (landing page with form)
- Admin: Hash-based routing with `#/admin`
- Smart routing based on authentication state
- Automatic redirect to login if session expires

## Deployment
- Build command: `npm run build`
- Static site deployment ready
- Supabase connection via environment variables (.env)
- No backend required - serverless architecture

## Environment Variables Required
- VITE_SUPABASE_URL
- VITE_SUPABASE_ANON_KEY

## Setup Instructions

### 1. Create Admin User in Supabase
1. Go to Supabase Dashboard → Authentication → Users
2. Click "Add User" and create a new user with:
   - Email: your@email.com
   - Password: strong_password
   - Auto-confirm user (disable email confirmation)

### 2. Deploy
```bash
npm run build
```

### 3. Access Admin Panel
- Navigate to `/#/admin` or click the settings button (⚙️) on the landing page
- Login with your admin credentials
- Manage property requests

## Technical Stack
- React 18.3.1
- TypeScript 5.5.3
- Tailwind CSS 3.4.1
- Supabase @supabase/supabase-js 2.57.4
- Lucide React for icons
- Vite for build tool
