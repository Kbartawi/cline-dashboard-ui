"use client";

import { useState, useEffect } from "react";
import { MCPSidebar } from "@/components/layout/MCPSidebar";
import { ClineNavbar } from "@/components/layout/ClineNavbar";
import { AgentOutput } from "@/components/task/AgentOutput";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bot, Code, Database, Loader2, Search, Send, Server, User } from "lucide-react";
import { autoRoutePrompt } from "@/services/agentRouterService";
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

// Sample agent-specific prompts to help users get started
const samplePrompts = [
  "Create a React button component with hover effects",
  "Search for information about the Model Context Protocol",
  "Create a database schema for a todo app",
  "Generate a project plan for building an e-commerce website",
  "Create a new GitHub repository for my project"
];

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState<MCPResponse | null>(null);
  const [usedAgentId, setUsedAgentId] = useState<string | null>(null);
  const [randomPrompt, setRandomPrompt] = useState("");
  
  // Refresh the placeholder prompt periodically
  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * samplePrompts.length);
    setRandomPrompt(samplePrompts[randomIndex]);
    
    const intervalId = setInterval(() => {
      const newIndex = Math.floor(Math.random() * samplePrompts.length);
      setRandomPrompt(samplePrompts[newIndex]);
    }, 8000);
    
    return () => clearInterval(intervalId);
  }, []);
  
  // Handle task submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim() || isLoading) return;
    
    setIsLoading(true);
    try {
      // Use the auto-routing service to determine the best agent
      const result = await autoRoutePrompt(prompt);
      
      // Set the response and used agent
      setResponse({
        ...result.response,
        timestamp: new Date(),
      });
      setUsedAgentId(result.usedAgentId);
    } catch (error) {
      // Handle any errors
      setResponse({
        type: "error",
        content: error instanceof Error ? error.message : "An unknown error occurred",
        timestamp: new Date(),
      });
      setUsedAgentId(null);
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

  // Function to get the agent name by id
  const getAgentName = (id: string): string => {
    const agent = sampleAgents.find(a => a.id === id);
    return agent ? agent.name : "Unknown Agent";
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
            {/* Simplified Input - Just a prompt field with auto-routing */}
            <Card className="w-full border-border bg-background">
              <CardHeader className="pb-3">
                <CardTitle className="text-lg font-medium text-foreground flex items-center gap-2">
                  <Search className="h-5 w-5" />
                  Ask Cline
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <Textarea
                    placeholder={`Type your question or request... (e.g., "${randomPrompt}")`}
                    className="min-h-[120px] resize-none border-border bg-background text-foreground placeholder:text-muted-foreground"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={isLoading}
                  />
                  
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-muted-foreground">
                      Cline will automatically use the most appropriate MCP agent
                    </div>
                    <Button 
                      type="submit" 
                      disabled={!prompt.trim() || isLoading}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing
                        </>
                      ) : (
                        <>
                          <Send className="mr-2 h-4 w-4" />
                          Send
                        </>
                      )}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
            
            {/* Output Display */}
            {isLoading ? (
              <div className="flex items-center justify-center p-12 border rounded-lg border-border bg-background">
                <div className="flex flex-col items-center gap-4">
                  <div className="h-8 w-8 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  <p className="text-sm text-muted-foreground">Finding the best answer for you...</p>
                </div>
              </div>
            ) : response ? (
              <>
                {/* Agent used info */}
                {usedAgentId && (
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                    <span>Response from:</span>
                    <span className="font-medium text-foreground">{getAgentName(usedAgentId)}</span>
                  </div>
                )}

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
                <div className="max-w-md text-center space-y-4">
                  <h3 className="text-lg font-medium text-foreground">How can Cline assist you today?</h3>
                  <p>Type your question or request in the input above and Cline will automatically choose the most appropriate MCP agent to help you.</p>
                  <div className="grid grid-cols-1 gap-2 pt-4 text-sm">
                    <div className="p-3 rounded bg-secondary/50">
                      <span className="font-medium">Example:</span> "Create a login form component for my React app"
                    </div>
                    <div className="p-3 rounded bg-secondary/50">
                      <span className="font-medium">Example:</span> "What's the Model Context Protocol and how does it work?"
                    </div>
                    <div className="p-3 rounded bg-secondary/50">
                      <span className="font-medium">Example:</span> "Help me design a database schema for a social media app"
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
}
