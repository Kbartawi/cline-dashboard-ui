"use client";

import { useState } from "react";
import { MCPSidebar } from "@/components/layout/MCPSidebar";
import { ClineNavbar } from "@/components/layout/ClineNavbar";
import { TaskPromptPanel } from "@/components/task/TaskPromptPanel";
import { AgentOutput } from "@/components/task/AgentOutput";
import { Bot, Code, Database, Server, User } from "lucide-react";
import { callMcpAgent } from "@/services/mcpService";
import { MCPResponse, ResponseType } from "@/types/mcp";

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

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<MCPResponse | null>(null);
  
  // Handle task submission to MCP agent
  const handleTaskSubmit = async (prompt: string, agentId: string) => {
    setIsLoading(true);
    try {
      // Call the appropriate MCP agent using the service
      const result = await callMcpAgent(agentId, prompt);
      
      // Set the response with current timestamp
      setResponse({
        ...result,
        timestamp: new Date(),
      });
    } catch (error) {
      // Handle any errors
      setResponse({
        type: "error",
        content: error instanceof Error ? error.message : "An unknown error occurred",
        timestamp: new Date(),
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Function to get code language from metadata or default
  const getLanguage = (): string => {
    if (response?.type === "code" && response.metadata?.language) {
      return response.metadata.language as string;
    }
    return "javascript"; // Default language
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
            <TaskPromptPanel onSubmit={handleTaskSubmit} isLoading={isLoading} />
            
            {/* Output Display */}
            {isLoading ? (
              <div className="flex items-center justify-center p-12 border rounded-lg border-border bg-background">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  <p className="text-sm text-muted-foreground">Processing request...</p>
                </div>
              </div>
            ) : response ? (
              <>
                {/* Show different output types based on response */}
                {response.type === "text" && (
                  <AgentOutput 
                    content={response.content} 
                    type="text" 
                    timestamp={response.timestamp} 
                  />
                )}
                {response.type === "code" && (
                  <AgentOutput 
                    content={response.content} 
                    type="code" 
                    language={getLanguage()} 
                    timestamp={response.timestamp} 
                  />
                )}
                {response.type === "ui" && (
                  <AgentOutput 
                    content={response.content} 
                    type="ui" 
                    timestamp={response.timestamp} 
                  />
                )}
                {response.type === "log" && (
                  <AgentOutput 
                    content={response.content} 
                    type="log" 
                    timestamp={response.timestamp} 
                  />
                )}
                {response.type === "json" && (
                  <AgentOutput 
                    content={response.content} 
                    type="code" 
                    language="json" 
                    timestamp={response.timestamp} 
                  />
                )}
                {response.type === "error" && (
                  <AgentOutput 
                    content={response.content} 
                    type="log" 
                    timestamp={response.timestamp} 
                    className="border-red-300 bg-red-50 dark:bg-red-950/10"
                  />
                )}
              </>
            ) : (
              <div className="flex flex-col items-center justify-center p-12 border rounded-lg border-border bg-background text-muted-foreground">
                <p>Select an MCP agent and submit a task to see the response here.</p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
