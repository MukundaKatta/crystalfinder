# CrystalFinder

> AI-Powered Materials Discovery and Crystal Structure Explorer

CrystalFinder is an interactive platform for exploring crystal structures, predicting material properties, and analyzing phase diagrams. It features a 3D crystal viewer powered by Three.js alongside a comprehensive materials database.

## Features

- **3D Crystal Viewer** -- Interactive WebGL visualization of crystal structures with adjustable rotation
- **Materials Database** -- Searchable catalog of materials with properties and classifications
- **Property Predictor** -- AI-driven prediction of material properties from composition
- **Phase Diagrams** -- Visual phase diagram exploration for multi-component systems
- **Periodic Table View** -- Element-level data with material linkages
- **Crystal System Info** -- Space group, bandgap, density, and lattice parameter display

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **3D Rendering:** Three.js, React Three Fiber, React Three Drei
- **Database:** Supabase (PostgreSQL)
- **Charts:** Recharts
- **State Management:** Zustand
- **Icons:** Lucide React

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your SUPABASE_URL and SUPABASE_ANON_KEY

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
  app/
    page.tsx              # Main application with tabbed interface
  components/
    CrystalViewer.tsx     # 3D WebGL crystal renderer
    MaterialsDatabase.tsx # Searchable materials catalog
    PropertyPredictor.tsx # AI property prediction
    PhaseDiagram.tsx      # Phase diagram visualizer
    PeriodicTableView.tsx # Interactive periodic table
  lib/
    store.ts              # Zustand state management
    materials.ts          # Material data and definitions
```

## License

MIT
