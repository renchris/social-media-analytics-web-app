# Social Media Analytics Web App

Visualization tool for Meta Marketing API metrics with focus on server-side rendering and type safety.

## Implementation Design Decisions

### Form Actions
Chose to utilize Next.js form actions for:
- Single round trip for form submission
- Maximizing server-side component usage

Implementation details:
- Custom server-compatible input components
  - Checkbox/radio inputs with inner labels styled as buttons
  - Values from name prop parameter instead of useState
  - Enables non-JS buttons to be server components
- Server-side state management
  - Values stored in server-side file
  - Avoided server action storage (server-side public API function called by client)

Considered tradeoffs:
- Increased styling complexity without useState
- Required dedicated submit button (no onChange/onClick submissions)
- Form parameters reset on submit by design
  - Not optimal for frequent parameter adjustments
  - Acceptable for this use case

### API Integration
Chose direct server-side fetch over API Route Handler because:
- Simple parameter-to-response transformation
  - No complex server-side logic between parameters and response
  - Logic handled in server-side file
Chose direct server-side fetch over Server Actions because:
- GET operation semantics
  - Not a mutation operation
  - Server actions would be sequential POST requests
  - Server actions expose client-accessible endpoints

### Data Visualization
Shadcn Charts (Recharts under the hood)implementation with:
- Dynamic metric support
  - Single and multiple metric views
  - Automatic axis scaling
- Breakdown capabilities
  - Stacked area views
  - Multi-axis support

## Tech Stack
- Next.js App Router
- TypeScript
- Shadcn Components and Charts
- Tailwind CSS

## Setup
```bash
# Install dependencies
pnpm install

# Run dev server
npm run dev

# Run on localhost:3000 in browser
```
