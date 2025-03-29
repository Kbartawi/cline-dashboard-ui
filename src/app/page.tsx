"use client";

import { useState } from "react";
import { MCPSidebar } from "@/components/layout/MCPSidebar";
import { ClineNavbar } from "@/components/layout/ClineNavbar";
import { TaskPromptPanel } from "@/components/task/TaskPromptPanel";
import { AgentOutput } from "@/components/task/AgentOutput";
import { Bot, Code, Database, Server, User } from "lucide-react";

// Sample data
const sampleAgents = [
  {
    id: "github-mcp",
    name: "GitHub",
    role: "Repository Management",
    status: "online" as const,
    icon: <Database className="h-4 w-4" />,
  },
  {
    id: "21st-magic",
    name: "21st Magic",
    role: "UI Component Generation",
    status: "online" as const,
    icon: <Code className="h-4 w-4" />,
  },
  {
    id: "perplexity",
    name: "Perplexity",
    role: "Search & Research",
    status: "busy" as const,
    icon: <Server className="h-4 w-4" />,
  },
  {
    id: "supabase",
    name: "Supabase",
    role: "Database Management",
    status: "offline" as const,
    icon: <User className="h-4 w-4" />,
  },
  {
    id: "planning",
    name: "Planning",
    role: "Software Planning",
    status: "online" as const,
    icon: <Bot className="h-4 w-4" />,
  },
];

const navbarAgents = [
  { id: "github-mcp", name: "GitHub", status: "online" as const },
  { id: "21st-magic", name: "21st Magic", status: "online" as const },
  { id: "perplexity", name: "Perplexity", status: "warning" as const },
  { id: "supabase", name: "Supabase", status: "offline" as const },
];

const sampleResponse = {
  text: "I've analyzed your request and found the following information about MCP agents in Cline:\n\nThe Model Context Protocol (MCP) enables communication between Cline and locally running MCP servers that provide additional tools and resources to extend capabilities.\n\nEach MCP agent specializes in different functionality, allowing for a more modular and extensible AI system.",
  code: `// Connect to an MCP server
const server = new MCPServer({
  name: "github-mcp",
  version: "1.0.0",
  capabilities: {
    tools: ["create_repository", "push_files"],
    resources: ["repo://owner/name"]
  }
});

// Use a tool provided by the server
const result = await cline.useMcpTool({
  server: "github-mcp",
  tool: "create_repository",
  args: {
    name: "my-new-repo",
    description: "Created via MCP",
    private: true
  }
});

console.log(\`Repository created: ${result.html_url}\`);`,
  log: "INFO: Connecting to MCP server github-mcp\nDEBUG: Setting up transport layer\nINFO: Connection established\nDEBUG: Requesting available tools\nINFO: Found 12 available tools\nDEBUG: Authentication successful\nINFO: Ready to process requests",
  ui: `<div class="flex items-center justify-between p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
  <div>
    <h3 class="font-medium">Dashboard Overview</h3>
    <p class="text-sm text-muted-foreground">Summary of MCP activity</p>
  </div>
  <div class="text-2xl font-bold">5</div>
</div>`
};

export default function Home() {
  const [selectedOutputType, setSelectedOutputType] = useState<"text" | "code" | "log" | "ui">("text");
  
  // Sample handlers
  const handleTaskSubmit = (prompt: string, agent: string) => {
    console.log(`Submitting task "${prompt}" to agent ${agent}`);
    // In a real app, this would call an API
  };

  return (
    <div className="h-screen flex flex-col">
      {/* Navbar */}
      <ClineNavbar systemName="Cline" agents={navbarAgents} />
      
      <div className="flex flex-1 overflow-hidden pt-14">
        {/* Sidebar */}
        <MCPSidebar agents={sampleAgents} />
        
        {/* Main Content */}
        <main className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto space-y-8">
            {/* Task Input */}
            <TaskPromptPanel onSubmit={handleTaskSubmit} />
            
            {/* Output Type Selector */}
            <div className="flex space-x-2">
              <button 
                className={`px-3 py-1 rounded ${selectedOutputType === 'text' ? 'bg-primary text-white' : 'bg-muted'}`}
                onClick={() => setSelectedOutputType("text")}
              >
                Text
              </button>
              <button 
                className={`px-3 py-1 rounded ${selectedOutputType === 'code' ? 'bg-primary text-white' : 'bg-muted'}`}
                onClick={() => setSelectedOutputType("code")}
              >
                Code
              </button>
              <button 
                className={`px-3 py-1 rounded ${selectedOutputType === 'log' ? 'bg-primary text-white' : 'bg-muted'}`}
                onClick={() => setSelectedOutputType("log")}
              >
                Log
              </button>
              <button 
                className={`px-3 py-1 rounded ${selectedOutputType === 'ui' ? 'bg-primary text-white' : 'bg-muted'}`}
                onClick={() => setSelectedOutputType("ui")}
              >
                UI
              </button>
            </div>

            {/* Output Display */}
            {selectedOutputType === "text" && (
              <AgentOutput content={sampleResponse.text} type="text" />
            )}
            {selectedOutputType === "code" && (
              <AgentOutput content={sampleResponse.code} type="code" language="javascript" />
            )}
            {selectedOutputType === "log" && (
              <AgentOutput content={sampleResponse.log} type="log" />
            )}
            {selectedOutputType === "ui" && (
              <AgentOutput content={sampleResponse.ui} type="ui" />
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
