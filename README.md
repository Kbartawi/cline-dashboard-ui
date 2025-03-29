# Cline Dashboard UI

This repo contains a dashboard UI for interacting with MCP agents in the Cline system.

## Overview

The Cline Dashboard UI provides a unified interface for accessing multiple MCP (Model Context Protocol) agents through a single input. Unlike traditional systems that require users to manually select specific agents, this dashboard uses intelligent routing to automatically determine the most appropriate agent based on the user's prompt.

## Key Features

### Auto-Routing Intelligence

- **Single Input Interface**: Users input their query in natural language without needing to know which specific tool to use
- **Intelligent Routing**: The system automatically analyzes the prompt and routes it to the most appropriate specialized agent
- **Context-Aware Responses**: Each agent provides responses formatted specifically for its domain (code, UI, data, etc.)

### Specialized MCP Agents

- **GitHub**: Repository management, code operations, issues tracking
- **21st Magic**: UI component generation and frontend development
- **Perplexity**: Search and research capabilities
- **Supabase**: Database management and SQL operations
- **Planning**: Software project planning and organization

### Adaptive Response Display

- **Code Highlighting**: Syntax highlighting for code responses
- **UI Component Preview**: Visual rendering of generated UI components
- **JSON Formatting**: Structured display of data responses
- **Terminal Output**: Console-style display for logs and system messages

## User Workflow

1. **Enter a natural language prompt** in the main input field
2. **Submit the request** with a single click
3. **View the response** in the appropriate format based on content type
4. **See which agent** was used to fulfill your request

This streamlined workflow is similar to popular AI assistants but with specialized capabilities through MCP agents.

## Optimizing Your Prompts

To get the most value out of the Cline Dashboard, consider using the following prompt template:

```
[Task]: Clearly state what you want to accomplish
[Context]: Provide any relevant background information
[Requirements]: List specific requirements or constraints
[Format]: Specify desired output format if needed
```

For example:

```
[Task]: Create a user profile card component
[Context]: Building a social media dashboard
[Requirements]: Include avatar, username, bio, and follower count
[Format]: React component with Tailwind CSS
```

This structured approach helps the system route your request to the most appropriate agent and generate more precise responses.

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
