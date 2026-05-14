# FaceSnap

A social media app built to demonstrate the mechanics of NgRx state management in Angular.

🔗 [Live Demo](https://face-snap-ten.vercel.app/feed)

## What this app covers

- Authentication (signup, login, logout) powered by Supabase
- Post feed powered by NgRx Store, Actions, Reducers, Selectors and Effects
- Friend suggestions loaded from Supabase profiles table
- Add and cancel friend requests with optimistic UI updates and rollback on failure
- Session persistence across page refresh using provideAppInitializer
- HTTP interceptor that attaches Bearer token to every request
- Derived selectors combining multiple state slices
- Effects with forkJoin for parallel API calls
- Mapping layer between API response and application model
- Real-time messaging feature with Supabase Realtime (INSERT and UPDATE events)
- Optimistic message sending with pending, sent and failed UI states
- Message delivery receipts — single tick, double tick and blue double tick
- Channel list with unread counts, last message preview and relative timestamps
- Per-conversation message cache with cache-hit guard to avoid redundant API calls
- Cross-slice selectors composing channels and messages state
- NgRx split store — separate channels and messages slices with dedicated actions, reducers, selectors and effects

## Why I built this

This project started as a learning exercise to deeply understand NgRx state management — not just the mechanics, but the reasoning behind every decision. Along the way it grew into a real app with Supabase authentication, a live database, and production patterns like optimistic updates, real-time subscriptions, session persistence and parallel data loading.

It is still a learning seed at heart. If you want to build a more complex Angular + NgRx app, this is a solid starting point.

## Tech Stack

- Angular 21
- NgRx (Store, Effects, Selectors)
- Supabase (Auth, Database, Realtime)
- Tailwind CSS v4
- Vercel (Deployment)

## Use this as a template

If you want to build a more complex Angular + NgRx app, this is a good starting point. You can extend it by adding:
- Post creation and commenting
- Role based authorization
- Read receipts propagated back to the sender via Realtime
- Paginated message history (scroll up to load older messages)

## Getting Started

```bash
npm install
ng serve
```

Create an `environment.ts` file with your Supabase credentials:

```typescript
export const environment = {
  supabaseUrl: 'YOUR_SUPABASE_URL',
  supabaseKey: 'YOUR_SUPABASE_ANON_KEY'
};
```
