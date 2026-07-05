---
title: Contributing to the School Website
description: How to contribute to the Anas Ibn Malik School Management System (GitHub repo)
---

# Contributing to the School Website

This guide covers how to contribute to the [Anas Ibn Malik School Management System](https://github.com/asaadzx/Anas-Ibn-Malik) — the main school website built with Next.js.

## Prerequisites

- **Bun** >= 1.3.14 installed
- **VS Code** installed (see [Getting Started with Computers](/docs/getting-started-with-computers))
- A **GitHub account** ([sign up here](https://github.com/signup))

## Step 1: Fork the Repository

1. Go to [github.com/asaadzx/Anas-Ibn-Malik](https://github.com/asaadzx/Anas-Ibn-Malik)
2. Click the **Fork** button (top-right)
3. This creates a copy of the repo under your own GitHub account

## Step 2: Clone Your Fork

Open a terminal and run:

```bash
git clone https://github.com/your-username/Anas-Ibn-Malik.git
cd Anas-Ibn-Malik
```

Replace `your-username` with your actual GitHub username.

## Step 3: Create a Branch

```bash
git checkout -b my-feature-branch
```

Use a descriptive name like `fix-login-bug` or `add-student-form`.

## Step 4: Install Dependencies

```bash
bun install
```

## Step 5: Make Your Changes

Open the project in VS Code:

```bash
code .
```

Edit the files you need to change. The project structure:

```
Anas-Ibn-Malik/
├── prisma/           # Database schema & migrations
├── src/
│   ├── app/          # Next.js pages & API routes
│   ├── components/   # Reusable UI components
│   └── lib/          # Utilities, helpers
├── public/           # Images, fonts
└── README.md
```

## Step 6: Test Your Changes

Start the dev server:

```bash
bun run dev
```

Open **http://localhost:3000** in your browser. Check that your changes work correctly.

## Step 7: Commit and Push

```bash
git add .
git commit -m "Describe what you changed"
git push origin my-feature-branch
```

## Step 8: Create a Pull Request

1. Go to your fork on GitHub
2. Click **Compare & pull request**
3. Write a clear description of your changes
4. Click **Create pull request**

The maintainer will review your changes and merge them.

## Code Style Tips

- Follow the existing code patterns in the project
- Use **meaningful names** for variables and functions
- Keep components **small and focused**
- Add **comments** where the logic isn't obvious
- Run `bun run lint` before committing to catch issues

## What Can You Work On?

- **Bug fixes** — look for issues labeled `bug` on GitHub
- **New features** — check the project's TODO or open issues
- **Documentation** — improve README, add comments
- **UI improvements** — refine styles, fix layout issues

## Need Help?

Open an **issue** on GitHub or ask in the project's discussion section.
