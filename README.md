# FaceSnap

A social media feed app built to demonstrate the mechanics of NgRx state management in Angular.

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

## Why I built this

This project started as a learning exercise to deeply understand NgRx state management — not just the mechanics, but the reasoning behind every decision. Along the way it grew into a real app with Supabase authentication, a live database, and production patterns like optimistic updates, session persistence and parallel data loading.

It is still a learning seed at heart. If you want to build a more complex Angular + NgRx app, this is a solid starting point.

## Tech Stack

- Angular 19
- NgRx (Store, Effects, Selectors)
- Supabase (Auth, Database)
- Vercel (Deployment)

## Use this as a template

If you want to build a more complex Angular + NgRx app, this is a good starting point. You can extend it by adding:
- A user profile page
- Real time notifications
- Post creation and commenting
- Role based authorization

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