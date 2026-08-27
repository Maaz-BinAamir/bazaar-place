# BazaarPlace

BazaarPlace is a marketplace for buying and selling pre-owned items. Users can publish listings with images, search the marketplace, view seller profiles, and start a conversation about a specific item.

This project was built to practice a complete full-stack product flow with Next.js, Convex, authentication, file uploads, and real-time messaging.

## Screenshots

Add screenshots to `docs/screenshots/` and replace the placeholder paths below.

![BazaarPlace landing page](docs/screenshots/landing-page.png)

![Marketplace listings](docs/screenshots/marketplace.png)

![Listing details](docs/screenshots/listing-details.png)

![Messaging interface](docs/screenshots/messaging.png)

![User profile](docs/screenshots/profile.png)

## Features

- Browse all available marketplace listings.
- Search listings by title, description, or location.
- Create listings with a title, description, price, location, and uploaded image.
- View a seller's profile and their listings.
- Edit profile information, including name, contact details, address, username, and profile photo.
- Sign up and log in with email and password.
- Sign in with Google OAuth.
- Send text messages and image messages.
- See unread message counts and mark conversations as read.
- Use the responsive interface on desktop and mobile screens.

## Tech stack

- Next.js 15 with the App Router
- React 19
- TypeScript
- Convex for the database, server functions, file storage, and reactive queries
- Convex Auth with password and Google providers
- Tailwind CSS v4
- Shadcn components
- React Hook Form and Zod for form handling and validation
- Lucide React for icons

## How it works

The app uses Convex as its backend. Listings, users, conversations, and messages are stored in Convex tables. Images are uploaded to Convex file storage, and server queries resolve stored file IDs into URLs before returning data to the client.

The main user flow is:

1. A user creates an account or signs in.
2. They browse or search listings in the bazaar.
3. They open a listing to view its details and seller profile.
4. They start a conversation with the seller, optionally attaching an image.
5. The buyer and seller continue the conversation from the chat area.
6. The seller can mark the listing as sold when the item is no longer available.

## Project structure

```text
app/                  Next.js routes, layouts, and global styles
components/           Reusable UI and feature components
convex/               Schema, queries, mutations, auth, and HTTP handlers
public/                Static assets
lib/                  Shared utilities
```

Important routes include:

| Route | Purpose |
| --- | --- |
| `/` | Landing page |
| `/login` | Login with password or Google |
| `/signup` | Create an account |
| `/bazaar` | Browse and search listings |
| `/bazaar/[id]` | View listing details |
| `/create-post` | Create a listing |
| `/profile` | View the signed-in user's profile |
| `/profile/edit` | Edit profile details |
| `/profile/[id]` | View another user's profile |
| `/chat` | View conversations |
| `/chat/[id]` | Open a conversation |

## Getting started

### Prerequisites

- Node.js 18.18 or later
- npm
- A Convex account and development deployment
- Google OAuth credentials if Google sign-in is enabled locally

### Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Maaz-BinAamir/bazaar-place
cd bazaar-place
npm install
```

Start Convex in one terminal:

```bash
npx convex dev
```

Start the Next.js development server in another terminal:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Environment variables

Convex CLI will create or update `.env.local` with `NEXT_PUBLIC_CONVEX_URL` when you connect the project to a Convex deployment. The local environment should contain the following values:

```env
NEXT_PUBLIC_CONVEX_URL=https://your-deployment.convex.cloud
CONVEX_SITE_URL=https://your-deployment.convex.site
GOOGLE_ID=your-google-client-id
GOOGLE_SECRET=your-google-client-secret
```

For password authentication, `GOOGLE_ID` and `GOOGLE_SECRET` are not needed. To use Google sign-in, add the OAuth callback URL for your Convex site to the Google Cloud project:

```text
https://your-deployment.convex.site/api/auth/callback/google
```



## Future improvements

- Add category and price filters.
- Add pagination or infinite scrolling for large marketplaces.
- Prevent duplicate conversations for the same buyer and listing.
- Add stronger authorization checks for listing updates and conversations.
- Add automated tests for authentication, listings, and chat flows.
- Add moderation and reporting tools for marketplace safety.


