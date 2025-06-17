
## Project Overview
Build **Ecofy**, a modern sustainability platform that seamlessly integrates 4 key features into one cohesive web application. This is for a hackathon project requiring premium UI/UX with storytelling landing page.

## Core Features to Build

### 1. **Waste Management Hub**
- Users can photograph waste items and get AI-powered category suggestions
- Connect with local recyclers and schedule pickups
- Track earnings from waste sales
- View transaction history and environmental impact

### 2. **Personal Carbon Footprint Tracker**
- Log daily activities (transportation, electricity, food consumption)
- AI-powered emission calculations with visual charts
- Monthly trends and reduction recommendations
- Progress tracking with gamification elements

### 3. **Community Issues Reporting** (Main Feature)
- Citizens report local infrastructure issues (potholes, broken streetlights, illegal dumping)
- Photo + location + description submission
- Community voting and commenting system
- Automatic authority notifications via email/SMS
- Issue status tracking and resolution updates

### 4. **Local Sharing Economy**
- List items for borrowing (tools, appliances, books, etc.)
- Browse available items in your area
- Request/approve borrowing with in-app messaging
- Rating and review system for trust building

## Design Requirements

### Visual Design
- **Color Scheme**: Nature-inspired greens (#22c55e primary) with warm amber accents (#f59e0b)
- **Typography**: Modern, clean fonts (Inter/similar) with clear hierarchy
- **Style**: Premium, modern design with subtle animations and micro-interactions
- **Components**: Use shadcn/ui components with custom styling for premium feel

### Landing Page Story
Create a compelling narrative structure:
1. **Hero Section**: Animated background, powerful headline about community transformation
2. **Problem Section**: Environmental challenges with animated statistics
3. **Solution Section**: 4 features showcased with interactive demos
4. **How It Works**: Step-by-step user journey with visuals
5. **Impact Section**: Real-time community statistics and success stories
6. **CTA Section**: Multiple entry points for different user types

### User Experience
- **Mobile-first design** with responsive layouts
- **Bottom navigation** for main features on mobile
- **Unified dashboard** showing impact across all features
- **Cross-feature integration**: Waste actions affect carbon scores, community engagement builds trust
- **Gamification**: Eco-points system, achievements, community challenges
- **Seamless navigation** between features without feeling like separate apps

## Technical Specifications

### Tech Stack
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **React Router** for navigation
- **Zustand** for state management
- **React Hook Form** for forms
- **Recharts** for data visualization
- **React Leaflet** for maps
- **Lucide React** for icons

### Key Components to Build

#### Layout Components
- Responsive header with navigation
- Mobile bottom tab navigation
- Sidebar for desktop
- Footer with links

#### Feature Components
- **Waste Hub**: Item cards, category filters, recycler map, transaction cards
- **Carbon Tracker**: Activity input forms, emission charts, progress bars, recommendations
- **Community Platform**: Issue cards, map view, voting interface, comment system
- **Sharing Platform**: Item grid, request modals, messaging interface, review system

#### Shared Components
- Dashboard with unified stats
- User profile and settings
- Notification system
- Search and filter interfaces
- Photo upload and camera integration
- Location picker with maps

### Data Integration
- Mock API endpoints for all features
- Local storage for user preferences
- Simulated real-time updates
- Sample data for demonstrations

### Performance Features
- Lazy loading for feature modules
- Image optimization
- Progressive loading states
- Offline-ready components

## Specific Implementation Details

### Dashboard Integration
- **Unified Stats Card**: Total eco-points, carbon saved, issues resolved, items shared
- **Quick Actions**: Add waste item, log activity, report issue, browse items
- **Recent Activity Feed**: Cross-feature activities in chronological order
- **Achievement Showcase**: Badges and progress indicators

### Cross-Feature Connections
- Waste recycling adds eco-points AND reduces carbon footprint
- Community engagement builds user trust score for sharing
- Sharing activities reduce carbon footprint calculations
- All activities contribute to unified sustainability score

### Mobile Experience
- Touch-friendly interface with large tap targets
- Swipe gestures for navigation
- Camera integration for photo capture
- Location services for nearby features
- Push notification simulation

### Interactive Elements
- **Animated counters** for statistics
- **Progress animations** for goal tracking
- **Hover effects** on interactive elements
- **Loading states** with skeleton screens
- **Success animations** for completed actions

## Sample User Flows

### New User Onboarding
1. Landing page → Sign up → Location setup → Feature introduction tour → First action in each module

### Waste Management Flow
1. Dashboard → Waste Hub → Add Item (camera) → AI categorization → Find recycler → Schedule pickup → Track transaction

### Community Reporting Flow
1. Discover issue → Report (photo + location) → Community validation → Authority notification → Track resolution

### Carbon Tracking Flow
1. Daily log → Activity selection → Impact calculation → View trends → Get recommendations → Set goals

### Sharing Flow
1. Browse items → Request item → In-app messaging → Pickup arrangement → Return + review

## Success Criteria
- **Visual Impact**: Premium, modern design that impresses at first glance
- **Seamless Integration**: Features feel like one cohesive platform, not separate tools
- **Fast Performance**: Smooth animations, quick loading, responsive interactions
- **Clear Storytelling**: Landing page effectively communicates value proposition
- **Intuitive UX**: Users can navigate and use features without confusion
- **Mobile Excellence**: Perfect mobile experience with native app feel

## Technical Notes for Lovable
- Prioritize visual polish and smooth user experience
- Use placeholder data that demonstrates real-world scenarios
- Implement responsive design for all screen sizes
- Focus on component reusability across features
- Include proper loading states and error handling
- Add subtle animations to enhance user experience
- Ensure accessibility with proper contrast and navigation

Build this as a showcase-ready application that demonstrates the full potential of an integrated sustainability platform, perfect for hackathon presentation and user testing.