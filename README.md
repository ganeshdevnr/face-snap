# FaceSnap

A social media feed app built to demonstrate the mechanics of NgRx state management in Angular.

## What this app covers

- Post feed powered by NgRx Store, Actions, Reducers, Selectors and Effects
- Friend suggestions with optimistic UI updates and rollback on failure
- Mapping layer between API response and application model
- Derived selectors combining multiple state slices

## Why I built this

This project is a learning seed — built to understand how NgRx works end to end, not to ship a production product. There is no authentication, no real backend, and no persistence. The API calls use DummyJSON as a placeholder.

## Use this as a template

If you want to build a more complex Angular + NgRx app, this is a good starting point. You can extend it by adding:
- Authentication and authorization
- A real backend
- More feature slices following the same pattern

## Running the app

```bash
npm install
ng serve
```

🔗 [Live Demo](https://face-snap-ten.vercel.app/feed)