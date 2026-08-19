# 🌿 Redroot — Nightly Ritual Web Experience

> _A high-performance, interactive, and beautifully crafted Next.js landing page built for Redroot as part of the Grinning Co assessment._

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18-61DAFB?style=flat-square&logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)
[![Motion](https://img.shields.io/badge/Motion-13.1-purple?style=flat-square)](https://motion.dev/)
[![Playwright](https://img.shields.io/badge/Playwright-E2E_Testing-2EAD33?style=flat-square&logo=playwright)](https://playwright.dev/)

---

## 📑 Table of Contents

- [Overview](#-overview)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Project Architecture & Directory Structure](#-project-architecture--directory-structure)
- [Getting Started](#-getting-started)
- [Available Scripts](#-available-scripts)
- [Testing & Quality Assurance](#-testing--quality-assurance)
- [Developer Info](#-developer-info)
- [License](#-license)

---

## 📖 Overview

**Redroot** is an immersive digital showcase designed for a premium botanical evening ritual brand. Built with **Next.js 14 App Router**, **TypeScript**, and **Tailwind CSS**, the application delivers a seamless, high-performance web experience featuring rich micro-interactions, scroll-driven animations, interactive product showcases, and integrated modal flows.

This project was developed as a technical assessment submission for **Grinning Co**.

---

## ✨ Key Features

- **🎨 Ambient & Interactive Visuals:** Custom canvas background effects (`HeroCanvas`, `AmbientBackground`) and custom interactive cursor (`CustomCursor`).
- **🌊 Scroll-Driven & Micro-Animations:** Motion-driven reveals and transition triggers powered by Motion (Framer Motion).
- **🛍️ Interactive Product Showcase & Ingredients:** Dynamic product cards with blend notes, ingredient breakdowns, and pricing tier selections.
- **🔐 Demo Authentication & Session Management:** Integrated Login Modal with mock state management powered by React Context (`DemoSessionContext`).
- **🎬 Interactive Media & Modals:** Embedded video preview modals (`VideoModal`) and seamless interactive sections.
- **📱 Fully Responsive Design:** Mobile-first layout optimized across all modern screen resolutions.
- **🧪 Comprehensive E2E Testing:** Playwright test suites covering interaction matrices, ingredient section behaviors, and developer contact integration.

---

## 🛠️ Tech Stack

### **Core Framework & Language**

- **[Next.js 14](https://nextjs.org/)** (App Router architecture)
- **[React 18](https://react.dev/)**
- **[TypeScript 5](https://www.typescriptlang.org/)**

### **Styling & UI Components**

- **[Tailwind CSS](https://tailwindcss.com/)** — Utility-first styling
- **[Lucide React](https://lucide.dev/)** — Modern SVG icon library
- **[Radix UI Slot](https://www.radix-ui.com/)** — Primitive UI slot component composition
- **[clsx](https://github.com/lukeed/clsx) & [tailwind-merge](https://github.com/dcastil/tailwind-merge)** — Dynamic class utility merging

### **Animation & Interactivity**

- **[Motion (Framer Motion)](https://motion.dev/)** — Fluid animations, scroll effects, and gestures

### **Testing & Quality Assurance**

- **[Playwright](https://playwright.dev/)** — End-to-end testing suite
- **[ESLint](https://eslint.org/)** — Code quality and linting rules

---

## 📂 Project Architecture & Directory Structure

```text
Grinning-Co-Internshala-Assessment/
├── public/                     # Static assets (images, icons, fonts)
│   └── images/
├── src/
│   ├── app/                    # Next.js App Router root
│   │   ├── fonts/              # Custom font configurations
│   │   ├── globals.css         # Global styles & Tailwind directives
│   │   ├── layout.tsx          # Root layout wrapper & metadata
│   │   └── page.tsx            # Main landing page entry
│   ├── components/
│   │   ├── background/         # Canvas and dynamic background shaders
│   │   │   └── AmbientBackground.tsx
│   │   ├── layout/             # Header Navbar & Footer components
│   │   │   ├── Footer.tsx
│   │   │   └── Navbar.tsx
│   │   ├── providers/          # Motion and UI providers
│   │   │   └── MotionProvider.tsx
│   │   ├── sections/           # Modular landing page sections
│   │   │   ├── DeveloperContact.tsx
│   │   │   ├── FAQ.tsx
│   │   │   ├── FinalCTA.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── HeroCanvas.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Ingredients.tsx
│   │   │   ├── LeadGen.tsx
│   │   │   ├── Pricing.tsx
│   │   │   ├── ProductShowcase.tsx
│   │   │   ├── Story.tsx
│   │   │   └── Testimonials.tsx
│   │   └── ui/                 # Reusable atomic UI components
│   │       ├── Accordion.tsx
│   │       ├── AnimatedReveal.tsx
│   │       ├── Button.tsx
│   │       ├── Container.tsx
│   │       ├── CustomCursor.tsx
│   │       ├── LoginForm.tsx
│   │       ├── LoginModal.tsx
│   │       ├── Logo.tsx
│   │       ├── PageLoader.tsx
│   │       ├── RevealOnScroll.tsx
│   │       ├── UserMenu.tsx
│   │       └── VideoModal.tsx
│   ├── context/                # Global React context state
│   │   └── DemoSessionContext.tsx
│   ├── data/                   # Static content data & profiles
│   │   ├── media.ts
│   │   └── profile.ts
│   ├── hooks/                  # Custom React hooks
│   │   └── useScrollLock.ts
│   └── lib/                    # Core utilities & brand constants
│       ├── constants.ts
│       └── utils.ts
├── tests/                      # Playwright E2E test specs
│   ├── developer-contact.spec.ts
│   ├── ingredients.spec.ts
│   └── interaction-matrix.spec.ts
├── next.config.mjs             # Next.js configuration
├── tailwind.config.ts          # Tailwind CSS theme configuration
├── playwright.config.ts        # Playwright test suite config
└── package.json                # Dependencies and npm scripts
```

---

## 🚀 Getting Started

### Prerequisites

Ensure you have the following installed on your machine:

- **Node.js**: `v18.x` or higher
- **npm**: `v9.x` or higher (or `pnpm` / `yarn` / `bun`)

### 1. Clone the Repository

```bash
git clone https://github.com/kumarnallana/Grinning-Co-Internshala-Assessment.git
cd Grinning-Co-Internshala-Assessment
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to view the application.

---

## 📜 Available Scripts

In the project directory, you can run:

| Command                      | Description                                               |
| :--------------------------- | :-------------------------------------------------------- |
| `npm run dev`                | Starts the Next.js development server at `localhost:3000` |
| `npm run build`              | Compiles and builds the production application bundle     |
| `npm start`                  | Launches the compiled Next.js production server           |
| `npm run lint`               | Runs ESLint to check for syntax and linting errors        |
| `npx playwright test`        | Executes the Playwright end-to-end test suite             |
| `npx playwright show-report` | Displays the interactive Playwright test report           |

---

## 🧪 Testing & Quality Assurance

End-to-End (E2E) testing is powered by **Playwright**.

### Run E2E Tests

```bash
npx playwright test
```

### Key Test Suites

- **`developer-contact.spec.ts`**: Validates developer contact links, modal rendering, and contact interactions.
- **`ingredients.spec.ts`**: Verifies interactive ingredient drawers, image assets, and accordion triggers.
- **`interaction-matrix.spec.ts`**: Audits overall user journey, navigation scrolling, modal triggers, and UI responsiveness.

---

## 👨‍💻 Developer Contact

**Nallana Sasi Kumar**  
_Full-Stack Developer_

- **Email:** [sasikumarnallana956@gmail.com](mailto:sasikumarnallana956@gmail.com)
- **GitHub:** [github.com/kumarnallana](https://github.com/kumarnallana)
- **LinkedIn:** [linkedin.com/in/sasi-kumar-nallana](https://www.linkedin.com/in/sasi-kumar-nallana)

---

## 📄 License

This project is created for evaluation purposes for the **Grinning Co** assessment.
