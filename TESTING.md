# Testing the Cline Dashboard UI

## Setup and Installation

1. Clone the repository and install dependencies:

```bash
git clone https://github.com/Kbartawi/cline-dashboard-ui.git
cd cline-dashboard-ui
npm install  # or yarn install or pnpm install
```

2. Start the development server:

```bash
npm run dev  # or yarn dev or pnpm dev
```

3. Open your browser to `http://localhost:3000`

## Important Note About Backend Functionality

This project currently uses a **simulated backend** located in `src/services/mcpService.ts` that provides mock responses for demonstration purposes. There is no actual connection to real MCP agents. This approach allows you to test the UI and interaction patterns without needing to set up real MCP servers.

## Testing the Interface

### Test Case 1: Auto-Routing Feature

Test the system's ability to automatically route prompts to the appropriate agent:

1. Enter in the prompt field: `Create a user profile card component with an avatar`
2. Click the "Send" button
3. **Expected Result**: The system should route this to the 21st Magic agent (you'll see "Response from: 21st Magic") and display UI component code or preview

### Test Case 2: GitHub Agent

Test with GitHub-related prompts:

1. Enter: `Create a new repository called test-project`
2. Click "Send" 
3. **Expected Result**: Response should show code for creating a GitHub repository

### Test Case 3: Perplexity Agent

Test with research-related prompts:

1. Enter: `What is the Model Context Protocol?`
2. Click "Send"
3. **Expected Result**: Response should show a text explanation about MCP

### Test Case 4: Supabase Agent

Test with database-related prompts:

1. Enter: `Show me a schema for a users table`
2. Click "Send"
3. **Expected Result**: Response should show SQL code for a database schema

### Test Case 5: Planning Agent

Test with project planning prompts:

1. Enter: `Create an implementation plan for a todo app`
2. Click "Send"
3. **Expected Result**: Response should show a structured project plan

## Testing UI Components

1. **Sidebar**: Hover over the sidebar to see it expand, displaying agent names and status
2. **Loading State**: While a request is processing, a spinner should appear in the button and the input should be disabled
3. **Response Display**: Different response types should be properly formatted:
   - Code responses should have syntax highlighting
   - UI responses should render HTML
   - JSON should be formatted and syntax highlighted
   - Log responses should have terminal-style formatting
4. **Copy Button**: Clicking the copy button in the top-right of a response should copy the content to clipboard

## Debugging

If you encounter any issues:

1. Check the browser console for errors
2. Verify that the mock agent responses in `src/services/mcpService.ts` are working
3. Make sure the keyword detection in `src/services/agentRouterService.ts` is correctly matching your prompt

## Extending the Implementation

To connect to real MCP agents instead of using simulated responses:

1. Replace the mock implementations in `mcpService.ts` with actual API calls to your MCP servers
2. Update the response handling to match the actual response formats from your MCP servers

The UI components and routing logic will continue to work as long as the response format matches the expected interface.
