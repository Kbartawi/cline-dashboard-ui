import { ResponseType } from "@/types/mcp";

// Simulate MCP agent responses
export async function callMcpAgent(agentId: string, prompt: string): Promise<{
  type: ResponseType;
  content: string;
  metadata?: Record<string, any>;
}> {
  // Simulate network latency
  await new Promise((resolve) => setTimeout(resolve, 1000));

  // Route to the appropriate agent based on ID
  switch (agentId) {
    case "github-mcp":
      return handleGithubMcp(prompt);
    case "21st-magic":
      return handleUiMcp(prompt);
    case "perplexity":
      return handlePerplexityMcp(prompt);
    case "supabase":
      return handleSupabaseMcp(prompt);
    case "planning":
      return handlePlanningMcp(prompt);
    default:
      return {
        type: "error",
        content: `Unknown agent: ${agentId}`,
      };
  }
}

function handleGithubMcp(prompt: string) {
  const lowercasePrompt = prompt.toLowerCase();
  
  if (lowercasePrompt.includes("create repository") || lowercasePrompt.includes("new repo")) {
    return {
      type: "code",
      content: `// Creating a new GitHub repository
const result = await githubApi.createRepository({
  name: "new-project",
  description: "Created via MCP",
  private: true,
  autoInit: true
});

console.log(\`Repository created: ${result.html_url}\`);`,
      metadata: {
        language: "javascript",
        repoName: "new-project"
      }
    };
  } else if (lowercasePrompt.includes("list") && lowercasePrompt.includes("repo")) {
    return {
      type: "json",
      content: JSON.stringify([
        {
          name: "cline-dashboard-ui",
          html_url: "https://github.com/user/cline-dashboard-ui",
          description: "Dashboard UI for Cline MCP agents",
          updated_at: "2025-03-29T12:00:00Z"
        },
        {
          name: "mcp-project",
          html_url: "https://github.com/user/mcp-project",
          description: "MCP integration example",
          updated_at: "2025-03-28T14:30:00Z"
        },
        {
          name: "personal-website",
          html_url: "https://github.com/user/personal-website",
          description: "My personal portfolio",
          updated_at: "2025-03-27T09:15:00Z"
        }
      ], null, 2),
      metadata: {
        count: 3
      }
    };
  } else {
    return {
      type: "text",
      content: `I'll help you with your GitHub request: "${prompt}". What specifically would you like to do with GitHub repositories or issues?`
    };
  }
}

function handleUiMcp(prompt: string) {
  const lowercasePrompt = prompt.toLowerCase();
  
  if (lowercasePrompt.includes("button") || lowercasePrompt.includes("component")) {
    return {
      type: "ui",
      content: `<div class="p-4 border rounded shadow-sm">
  <h3 class="text-lg font-medium mb-2">Custom Button Component</h3>
  <button class="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors">
    Click Me
  </button>
  <p class="mt-2 text-sm text-gray-600">A responsive button component with hover effects</p>
</div>`,
      metadata: {
        componentType: "button"
      }
    };
  } else if (lowercasePrompt.includes("card") || lowercasePrompt.includes("container")) {
    return {
      type: "ui",
      content: `<div class="max-w-md p-6 bg-white border rounded-lg shadow-md">
  <div class="flex items-center justify-between mb-4">
    <h3 class="text-xl font-bold">Feature Card</h3>
    <span class="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">New</span>
  </div>
  <p class="text-gray-600 mb-4">This card component can be used to display feature highlights, product information, or user profiles.</p>
  <div class="flex justify-end">
    <button class="text-sm text-blue-600 hover:text-blue-800">Learn more →</button>
  </div>
</div>`,
      metadata: {
        componentType: "card"
      }
    };
  } else {
    return {
      type: "code",
      content: `// React component for your request
import { useState } from 'react';

export function CustomComponent() {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <div className="p-4 border rounded">
      <h3 className="text-lg font-medium">Custom Component</h3>
      <p>This component was generated based on your prompt: "${prompt}"</p>
      <button 
        className={\`mt-2 px-4 py-2 rounded \${isActive ? 'bg-green-500' : 'bg-blue-500'} text-white\`}
        onClick={() => setIsActive(!isActive)}
      >
        {isActive ? 'Active' : 'Inactive'}
      </button>
    </div>
  );
}`,
      metadata: {
        language: "jsx",
        componentType: "custom"
      }
    };
  }
}

function handlePerplexityMcp(prompt: string) {
  return {
    type: "text",
    content: `Based on your query "${prompt}", I've found the following information:

The Model Context Protocol (MCP) is a standardized way for AI models to interact with external tools and services. It defines a JSON-RPC based protocol that allows models to discover and use capabilities provided by MCP servers.

Key benefits include:
- Standardized communication between models and tools
- Dynamic discovery of capabilities
- Extensible design for future enhancements
- Support for both synchronous and asynchronous operations

MCP servers can provide tools (executable functions) and resources (data sources) that models can leverage to perform complex tasks beyond their training data.

For more information, you can visit the official documentation at https://modelcontextprotocol.ai`,
    metadata: {
      searchResults: 5,
      confidence: "high"
    }
  };
}

function handleSupabaseMcp(prompt: string) {
  const lowercasePrompt = prompt.toLowerCase();
  
  if (lowercasePrompt.includes("schema") || lowercasePrompt.includes("table")) {
    return {
      type: "code",
      content: `-- Database schema
CREATE TABLE public.users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES public.users(id),
  username TEXT UNIQUE,
  full_name TEXT,
  avatar_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Users can view their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);`,
      metadata: {
        language: "sql",
        tables: ["users", "profiles"]
      }
    };
  } else if (lowercasePrompt.includes("query") || lowercasePrompt.includes("select")) {
    return {
      type: "json",
      content: JSON.stringify([
        {
          "id": "d8f3b17a-6e35-4bcd-9fef-48513aa31c2a",
          "username": "sarah_dev",
          "full_name": "Sarah Johnson",
          "email": "sarah@example.com"
        },
        {
          "id": "a7c91e5b-8f6d-42a8-9d7f-5c9a8b2e4c1b",
          "username": "tech_mike",
          "full_name": "Mike Roberts",
          "email": "mike@example.com"
        },
        {
          "id": "f5c42e1d-9b7a-4e2f-8c3d-1a6b9f0e7d8c",
          "username": "coderlisa",
          "full_name": "Lisa Chen",
          "email": "lisa@example.com"
        }
      ], null, 2),
      metadata: {
        rows: 3,
        query: "SELECT * FROM users JOIN profiles ON users.id = profiles.id LIMIT 3"
      }
    };
  } else {
    return {
      type: "log",
      content: `> Connecting to Supabase project...
> Successfully connected to db.project.supabase.co
> Executing request: "${prompt}"

ERROR: Insufficient permissions to perform requested operation.
Please check your API key permissions and try again.

> Connection closed.`,
      metadata: {
        success: false,
        errorCode: "PERMISSION_DENIED"
      }
    };
  }
}

function handlePlanningMcp(prompt: string) {
  return {
    type: "text",
    content: `# Implementation Plan for "${prompt}"

## Phase 1: Initial Setup
1. Create project repository
2. Configure development environment
3. Set up CI/CD pipeline

## Phase 2: Core Functionality
1. Implement data models
2. Create business logic layer
3. Develop API endpoints

## Phase 3: User Interface
1. Design component system
2. Implement views and interactions
3. Integrate with backend APIs

## Phase 4: Testing & Deployment
1. Write unit and integration tests
2. Perform security audit
3. Deploy to production environment

Estimated timeline: 4-6 weeks`,
    metadata: {
      format: "markdown",
      phases: 4,
      estimatedWeeks: 5
    }
  };
}
