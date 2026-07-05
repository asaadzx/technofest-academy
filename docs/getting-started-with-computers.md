---
title: Getting Started with Computers
description: VS Code installation, file extensions, and basic computer concepts
---

# Getting Started with Computers

## What is a File Extension?

A file extension is the suffix at the end of a filename that tells your computer what type of file it is. It comes after the last dot (`.`).

| Extension | File Type | How to Open |
|-----------|-----------|-------------|
| `.txt` | Plain text | Any text editor |
| `.md` | Markdown | VS Code, any text editor |
| `.html` | Web page | Browser |
| `.css` | Stylesheet | VS Code, any text editor |
| `.js` / `.ts` | JavaScript / TypeScript | VS Code |
| `.py` | Python | VS Code, Python IDLE |
| `.json` | Data (JSON format) | VS Code, any text editor |
| `.png` / `.jpg` / `.webp` | Image | Browser, image viewer |
| `.pdf` | Document | PDF reader |
| `.zip` | Compressed archive | Unzip utility |

## Installing VS Code

1. Go to [code.visualstudio.com](https://code.visualstudio.com)
2. Click **Download** (choose your OS: Windows, macOS, or Linux)
3. Run the installer and follow the steps
4. Open VS Code — you'll see the welcome screen

### Recommended Extensions for Web Development

Open the Extensions panel (`Ctrl+Shift+X`) and install:

- **Prettier** — auto-formats your code
- **ESLint** — catches errors as you type
- **Tailwind CSS IntelliSense** — autocomplete for Tailwind classes
- **GitLens** — visualize Git history inline
- **Live Server** — preview HTML pages in your browser

### Useful Shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+P` | Quick open a file |
| `Ctrl+Shift+P` | Command palette |
| `Ctrl+\`` | Toggle terminal |
| `Ctrl+S` | Save file |
| `Ctrl+Z` | Undo |
| `Ctrl+Shift+Z` | Redo |
| `Ctrl+D` | Select next occurrence of word |
| `Alt+Up/Down` | Move line up/down |

## File System Basics

```
C:\ (Windows) or / (Mac/Linux)
├── Users/ (or home/)
│   ├── your-name/
│   │   ├── Documents/
│   │   ├── Downloads/
│   │   ├── Desktop/
│   │   └── Dev/
│   └── ...
└── Programs/ (or Applications/)
```

- **Path**: The address of a file or folder (e.g., `Documents/school/website/index.html`)
- **Root**: The top-most folder in the drive (`C:\` or `/`)
- **Parent/Child**: Folders inside other folders

## The Command Line

A terminal lets you control your computer with text commands instead of clicking.

### Opening the Terminal

- **VS Code**: `Ctrl+\``
- **Windows**: Search "cmd" or "PowerShell"
- **Mac**: Search "Terminal"

### Basic Commands

| Command | What it does |
|---------|-------------|
| `ls` (Mac/Linux) / `dir` (Windows) | List files in current folder |
| `cd folder-name` | Change into a folder |
| `cd ..` | Go to parent folder |
| `mkdir folder-name` | Create a new folder |
| `rm file-name` | Delete a file |
| `pwd` | Show current path |

Try it: open a terminal and type `ls` to see your files.

## What is Git?

Git is a **version control system** — it tracks changes to your files over time, like a save button for your entire project.

### Key Concepts

- **Repository (repo)**: A folder managed by Git
- **Commit**: A snapshot of your files at a point in time
- **Branch**: A separate line of development (like a draft)
- **Push/Pull**: Send/receive changes to/from GitHub

### Basic Git Workflow

```bash
git add .                  # stage all changes
git commit -m "message"    # save a snapshot
git push                   # upload to GitHub
git pull                   # download latest from GitHub
```

## What is Markdown?

Markdown (`.md`) is a simple way to format text. It's used for READMEs, docs, and notes.

```markdown
# Heading 1
## Heading 2

**bold text** *italic text*

- List item
- Another item

[Link text](https://example.com)

![Image alt text](image.png)
```
