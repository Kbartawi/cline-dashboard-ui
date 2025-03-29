# Cline Dashboard UI

This repo contains a dashboard UI for interacting with MCP agents in the Cline system.

## Features

- **Agent Selection**: Browse and select from available MCP agents
- **Task Input**: Submit tasks to selected agents
- **Response Viewing**: View adaptive responses from agents (text, code, UI, logs)
- **Modern Interface**: Clean, developer-friendly UI inspired by Notion

## Tech Stack

- React/Next.js
- TypeScript
- Tailwind CSS

## Project Structure

```
/components
  /ui              # Base UI components
  /layout          # Layout components (sidebar, header)
  /agent           # Agent-related components
  /task            # Task input and response components
/lib               # Utility functions and types
/hooks             # Custom React hooks
/app               # Next.js app directory
```

## Getting Started

```bash
# Clone the repository
git clone https://github.com/Kbartawi/cline-dashboard-ui.git
cd cline-dashboard-ui

# Install dependencies
pnpm install

# Start development server
pnpm dev
```

## License

MIT
