# AVA OS - Personal Intelligence Core

AVA OS is a personal intelligence dashboard prototype. It combines system status, active objectives, knowledge-graph thinking, conversational planning, and onboarding into one operating surface.

View the AI Studio prototype: https://ai.studio/apps/0f3f9634-1ca8-4258-b983-206c2688de20

## What It Explores

- A personal AI operating layer rather than a single chat window.
- Dashboard, graph, and interview-mode interaction patterns.
- How an assistant could expose state, context, and next actions.
- The boundary between a useful personal system and a purely aesthetic dashboard.

## Technical Notes

- React and Vite frontend.
- Gemini API integration through `@google/genai`.
- D3 for graph-oriented interface work.
- lucide-react for interface icons.

## Current Status

This is a prototype source repo. It is a strong concept and interaction sketch, but it does not yet include durable personal data connectors, production auth, permissions, encrypted storage, or long-running memory management.

## Run Locally

Prerequisite: Node.js.

1. Install dependencies:
   `npm install`
2. Create `.env.local` and add your own Gemini API key.
3. Run the app:
   `npm run dev`

## API Key Boundary

Do not deploy this Vite app with a private Gemini key embedded into browser JavaScript. If deploying outside AI Studio, use a server-side API route or an explicit visitor-provided key flow.

## AI-Assisted Build Note

This prototype was built with AI assistance. The important work is the product model: defining the assistant surface, separating modes, identifying missing production controls, and iterating toward a system someone could actually use.

## Related Public Notes

See the combined prototype overview repo: https://github.com/brycejohnson1417/ai-studio-prototype-overviews
