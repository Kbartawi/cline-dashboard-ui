"use client";

import React from "react";
import { Activity, AlertCircle, CheckCircle, Menu, Settings } from "lucide-react";
import { cn } from "@/lib/utils";

interface AgentStatus {
  id: string;
  name: string;
  status: "online" | "offline" | "warning" | "error";
}

interface ClineNavbarProps {
  systemName?: string;
  agents?: AgentStatus[];
  className?: string;
}

export function ClineNavbar({ 
  systemName = "Cline", 
  agents = [], 
  className 
}: ClineNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "online":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case "offline":
        return <Activity className="h-4 w-4 text-gray-400" />;
      case "warning":
        return <AlertCircle className="h-4 w-4 text-amber-500" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <Activity className="h-4 w-4" />;
    }
  };

  return (
    <div className={cn(
      "fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/80 backdrop-blur-md",
      className
    )}>
      <div className="container mx-auto px-4">
        <div className="flex h-14 items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-lg font-semibold text-foreground">{systemName}</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            {agents.map((agent) => (
              <div key={agent.id} className="flex items-center gap-2">
                {getStatusIcon(agent.status)}
                <span className="text-sm text-muted-foreground">{agent.name}</span>
              </div>
            ))}
            <button className="rounded-full p-2 hover:bg-muted transition-colors">
              <Settings className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>
          
          <button 
            className="md:hidden rounded-md p-2 hover:bg-muted transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-5 w-5 text-muted-foreground" />
          </button>
        </div>
      </div>
      
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-border bg-background">
          <div className="container mx-auto px-4 py-3">
            <div className="flex flex-col gap-4">
              {agents.map((agent) => (
                <div key={agent.id} className="flex items-center gap-2 py-2">
                  {getStatusIcon(agent.status)}
                  <span className="text-sm text-muted-foreground">{agent.name}</span>
                </div>
              ))}
              <div className="flex items-center gap-2 py-2">
                <Settings className="h-5 w-5 text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Settings</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
