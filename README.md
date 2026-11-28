[![CI](https://github.com/zanzers/Palawan-homes/actions/workflows/ci.yml/badge.svg?branch=main)](https://github.com/zanzers/Palawan-homes/actions/workflows/ci.yml)

# Palawan Homes Agent Portal

**Your Properties. Your Business. One Workspace.**

A centralized, AI-assisted real estate management workspace designed to help real estate agents manage property listings, create promotional content, publish to social media, maintain client communications, and streamline their daily operations.

## Overview

Palawan Homes Agent Portal is an internal workspace for real estate agents.

The goal is to provide agents with a centralized environment where they can manage their property business without constantly switching between different tools.

The platform aims to help agents:

- Create, manage, and organize property listings.
- Monitor listing activity and publishing status.
- Generate property descriptions with AI assistance.
- Create promotional content for social media.
- Prepare and manage marketing materials.
- Communicate with prospective clients.
- Manage conversations from supported messaging platforms.
- Maintain their professional profiles.
- Receive important notifications.
- Manage connected accounts and workspace preferences.

The long-term vision is to develop Palawan Homes into an **AI-powered workspace for real estate agents**, rather than simply another property catalog.

The application is initially being developed as a frontend-focused project, with backend, AI, social media, and messaging integrations planned for later development.

---

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
| Lucide React | Icons |
| Radix UI | Accessible UI primitives |

Additional dependencies will be introduced as the project develops.

---

## Core Features

### 1. Authentication & Brand Identity

- Login
- Signup
- Forgot Password
- Palawan Homes branding
- Responsive authentication layouts

Real authentication and account management will be connected to the backend later.

### 2. Agent Dashboard

- Dashboard overview
- Total listings
- Active listings
- Draft listings
- Published listings
- Recent property listings
- Search and filtering
- AI feature entry points
- Important activity summaries

The dashboard will serve as the agent's central workspace.

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

AI will help agents create and improve property listings.

Planned capabilities:

- Generate property descriptions.
- Generate listing information from agent-provided details.
- Improve property titles and descriptions.
- Assist with organizing property information.
- Review and edit generated content.
- Transfer generated information into the listing form.

AI functionality will support a fallback approach:

**Primary AI Provider → Secondary AI Provider → Manual Mode**

The objective is to ensure agents can continue working even when an AI provider is unavailable or its usage limit has been reached.

Actual AI integrations will be implemented separately.

### 5. AI Assistant

A future AI assistant will help agents with more than just listing creation.

Potential capabilities include:

- Assist with property-related tasks.
- Generate marketing materials.
- Improve promotional descriptions.
- Suggest content ideas.
- Help organize property information.
- Assist with daily agent workflows.

The AI assistant will be developed incrementally, with its scope and available actions defined before implementation.

### 6. Agent Profile

- Profile picture
- Cover/banner image
- Agent information
- Biography
- Contact information
- Social media links

The profile will represent the agent's professional identity within the workspace.

### 7. Publishing Management

A centralized marketing workspace where agents can prepare promotional content for their properties.

Planned capabilities:

- Promotional content management.
- AI-assisted caption generation.
- Property-based promotional content.
- Facebook post captions.
- Instagram captions and hashtags.
- TikTok video script generation.
- Promotional advertisement copy.
- Content previews.
- Draft management.
- Publishing status tracking.

#### Future Social Media Integrations

The long-term goal is to connect supported social media accounts so agents can manage their marketing activities from Palawan Homes.

Potential integrations:

- Facebook Pages
- Instagram Business
- Other supported social media platforms

The intended workflow:

1. Agent creates or selects a property listing.
2. AI generates promotional content.
3. Agent reviews and edits the generated content.
4. Agent selects a supported publishing destination.
5. Agent publishes or saves the content as a draft.
6. Publishing status is tracked within the workspace.

Actual publishing will depend on the available platform APIs, permissions, and integration requirements.

### 8. Messages

An outbound messaging system that allows agents to communicate with prospective clients.

Initial capabilities:

- Compose messages.
- Manage sent messages.
- View message history.
- Track delivery statuses.
- Maintain communication records.

**Important:** The initial Messages feature is designed as a one-way outbound messaging system. Clients cannot reply through this feature.

This functionality is separate from the planned Messenger Inbox integration.

### 9. Messenger Inbox — Future Integration

A future integration with the official Meta Messenger Platform.

The objective is to allow agents to view and respond to Facebook Page conversations directly within Palawan Homes.

Potential capabilities:

- Connect Facebook Pages.
- Receive incoming Messenger messages.
- View conversations in a unified inbox.
- Reply to clients through the platform.
- Display available sender information.
- Associate conversations with property listings.
- Receive notifications for new messages.
- Maintain conversation history.

#### Planned Integration Architecture

```text
Facebook Page
      |
      v
Meta Messenger Platform
      |
      v
Palawan Homes Backend
      |
      | Webhooks and API
      |
      v
Conversation Database
      |
      v
Messenger Inbox
      |
      v
Agent Dashboard
```

Integration requirements may include:

- Meta Developer App.
- Facebook Page authorization.
- Messenger API.
- Webhook configuration.
- Required Meta permissions and App Review.
- Backend message processing and storage.

**Important:** Messenger Inbox is a separate feature from the existing outbound Messages system. It will be implemented as a dedicated messaging integration.

The integration will follow Meta's platform policies and messaging restrictions.

### 10. Notifications

- Activity notifications.
- Listing updates.
- Publishing updates.
- New message notifications.
- Read/unread states.
- Notification management.

Future integrations may introduce notifications from connected services.

### 11. Settings

- Account preferences.
- Appearance preferences.
- Light Mode.
- Dark Mode.
- System Mode.
- Connected account management.

Theme preferences will be applied globally and persisted locally.

#### Future Connected Accounts

A dedicated area for managing external platform connections.

Potential integrations:

- Facebook Pages.
- Messenger.
- Instagram Business.
- Supported AI providers.

Agents should be able to manage their connected accounts and authorization settings from one location.

### 12. Tools

The Tools section is reserved for future functionality.

Its features and scope will be defined before implementation.

---

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
│   ├── ai-listing/
│   ├── ai-assistant/
│   ├── profile/
│   ├── publishing/
│   ├── messages/
│   ├── messenger-inbox/
│   ├── notifications/
│   ├── settings/
│   └── integrations/
│
├── services/
├── hooks/
├── types/
├── utils/
└── constants/
```

### Architecture Guidelines

- Follow separation of concerns.
- Keep components reusable and focused.
- Organize functionality by feature.
- Separate UI components from business logic.
- Use TypeScript types for application data.
- Avoid unnecessary component duplication.
- Keep external integrations isolated in service modules.
- Separate AI generation logic from individual UI components.
- Keep messaging integrations independent from the existing outbound messaging feature.
- Maintain compatibility with future backend integration.
- Avoid tightly coupling the frontend to a specific AI provider or external platform.

The architecture may evolve as the application grows.

---

## Development Roadmap

Development will proceed incrementally.

| Stage | Focus | Status |
|---|---|---|
| 1 | Project setup and brand identity | Completed |
| 2 | Authentication frontend | Implemented; API pending |
| 3 | Agent dashboard | Prototype completed |
| 4 | Property listing management | Planned |
| 5 | Agent profile | Planned |
| 6 | AI-assisted listing creation | Planned |
| 7 | Publishing management | Planned |
| 8 | Outbound messaging | Planned |
| 9 | Notifications and settings | Planned |
| 10 | Backend and database integration | Future |
| 11 | AI provider integration | Future |
| 12 | Social media publishing integration | Future |
| 13 | Facebook Messenger Inbox | Future |
| 14 | Additional integrations and AI assistant capabilities | Future |

The roadmap is flexible and may change as development progresses.

---

## Development Philosophy

The project follows these principles:

1. **Agent First** — Build around the daily needs of real estate agents.
2. **AI Assisted** — Use AI to reduce repetitive work and improve productivity.
3. **Centralized Workspace** — Keep property management, marketing, and communication organized in one place.
4. **Modular Architecture** — Keep features independent and maintainable.
5. **Integration Ready** — Design the system to support external services and APIs.
6. **Manual Fallback** — Never make essential workflows completely dependent on AI.
7. **Incremental Development** — Build, test, and improve features progressively.

---

## Project Vision

Palawan Homes Agent Portal aims to become a centralized business workspace for real estate agents.

Instead of simply storing property listings, the platform will help agents:

- Create and manage their properties.
- Generate professional property descriptions.
- Create marketing materials with AI.
- Prepare and publish social media content.
- Communicate with prospective clients.
- Manage supported messaging channels.
- Organize their daily activities.

**The goal is simple: Give real estate agents one workspace to manage their properties, marketing, and client relationships.**

---

## Getting Started

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

```text
http://localhost:3000
```

---

## Project Status

Currently focused on frontend development and establishing the application's architecture.

Backend services, database integration, AI providers, social media publishing, and Messenger integration will be introduced in future development stages.