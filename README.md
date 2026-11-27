# Palawan Homes Agent Portal

**Your Properties. Your Business. One Workspace.**

A centralized real estate management platform designed to help real estate agents manage property listings, maintain their professional profiles, organize promotional content, and streamline their daily operations.

## Overview

Palawan Homes Agent Portal is an internal workspace for real estate agents.

The platform aims to provide agents with a centralized environment where they can:

- Create, manage, and organize property listings.
- Monitor listing performance and publishing status.
- Generate property descriptions with AI assistance.
- Manage their professional profiles.
- Prepare promotional content.
- Send messages to prospective clients.
- Receive important notifications.
- Customize their workspace preferences.

The application is initially being developed as a frontend-focused project, with backend and AI integrations planned for later development.

## Technology Stack

| Technology | Purpose |
|---|---|
| Next.js | React framework |
| React | User interface |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| ESLint | Code quality |
| Leaflet | Interactive property maps |
| OpenStreetMap | Free map tile provider |

Additional dependencies will be introduced as the project develops.

## Core Features

### 1. Authentication & Brand Identity
- Login
- Signup
- Forgot Password
- Palawan Homes branding
- Responsive authentication layouts

### 2. Agent Dashboard
- Dashboard overview
- Total listings
- Active listings
- Draft listings
- Published listings
- Recent property listings
- Search and filtering
- AI feature entry points

### 3. Property Listing Management
- Create property listings
- View listing details
- Update existing listings
- Delete listings
- Manage property images
- Organize property categories and statuses
- Interactive map-based location selection

Property location selection will use Leaflet and OpenStreetMap rather than a paid Google Maps integration.

### 4. AI-Assisted Listing Creation
- Generate property descriptions.
- Generate listing information from agent-provided details.
- Review and edit generated content.
- Transfer generated information into the listing form.

AI functionality will support a fallback approach:

**Primary AI Provider → Secondary AI Provider → Manual Mode**

Actual AI integrations will be implemented separately.

### 5. Agent Profile
- Profile picture
- Cover/banner image
- Agent information
- Biography
- Contact information
- Social media links

### 6. Publishing Management
- Promotional content management
- AI-assisted caption generation
- Content previews
- Draft management
- Publishing status

### 7. Messages
An outbound messaging system that allows agents to communicate with prospective clients.

- Compose messages.
- Manage sent messages.
- View message history.
- Track mock delivery statuses.

**Note:** This is a one-way messaging system. Clients cannot reply through the platform.

### 8. Notifications
- Activity notifications
- Listing updates
- Read/unread states
- Notification management

### 9. Settings
- Account preferences
- Appearance preferences
- Light Mode
- Dark Mode
- System Mode

Theme preferences will be applied globally and persisted locally.

### 10. Tools
The Tools section is reserved for future functionality. Its features will be defined before implementation.

## Initial Project Architecture

The project will follow a feature-oriented and reusable component architecture.

```text
src/
├── app/
│   ├── (auth)/
│   └── (agent)/
│
├── components/
│   ├── layout/
│   ├── ui/
│   └── shared/
│
├── features/
│   ├── dashboard/
│   ├── listings/
│   ├── profile/
│   ├── publishing/
│   ├── messages/
│   ├── notifications/
│   └── settings/
│
├── services/
├── hooks/
├── types/
└── utils/
```

### Architecture Guidelines

- Follow separation of concerns.
- Keep components reusable and focused.
- Organize functionality by feature.
- Separate UI components from business logic.
- Use TypeScript types for application data.
- Avoid unnecessary component duplication.
- Keep external integrations isolated in service modules.
- Maintain compatibility with future backend integration.

The architecture may evolve