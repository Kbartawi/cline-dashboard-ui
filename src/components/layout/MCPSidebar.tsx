"use client";

import React, { useState } from "react";
import { cn } from "@/lib/utils";
import { Bot, Code, Database, Server, User, Users } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";

interface Agent {
  id: string;
  name: string;
  role: string;
  status: "online" | "offline" | "busy";
  icon: React.ReactNode;
}

interface MCPSidebarProps {
  agents: Agent[];
  className?: string;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
}

export function MCPSidebar({
  agents,
  className,
  open: openProp,
  setOpen: setOpenProp,
}: MCPSidebarProps) {
  const [openState, setOpenState] = useState(true);
  
  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <div className={cn("flex h-full", className)}>
      <motion.div
        className={cn(
          "h-full px-4 py-4 flex flex-col bg-background border-r border-border w-[280px] flex-shrink-0"
        )}
        animate={{
          width: open ? "280px" : "60px",
        }}
        onMouseEnter={() => setOpen(true)}
        onMouseLeave={() => setOpen(false)}
      >
        <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
          {open ? <Logo /> : <LogoIcon />}
          
          <div className="mt-8 mb-4">
            <h2 className={cn(
              "text-sm font-medium text-muted-foreground transition-opacity",
              open ? "opacity-100" : "opacity-0"
            )}>
              MCP AGENTS
            </h2>
          </div>
          
          <div className="flex flex-col gap-1">
            {agents.map((agent) => (
              <AgentLink key={agent.id} agent={agent} open={open} />
            ))}
          </div>
        </div>
        
        <div className="mt-auto pt-4 border-t border-border">
          <Link
            href="#"
            className="flex items-center gap-2 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-md px-2 transition-colors"
          >
            <Users className="h-5 w-5 flex-shrink-0" />
            <motion.span
              animate={{
                display: open ? "inline-block" : "none",
                opacity: open ? 1 : 0,
              }}
              className="whitespace-pre"
            >
              Manage Agents
            </motion.span>
          </Link>
        </div>
      </motion.div>
    </div>
  );
}

const AgentLink = ({ agent, open }: { agent: Agent; open: boolean }) => {
  return (
    <Link
      href={`/agents/${agent.id}`}
      className="flex items-center gap-2 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground rounded-md px-2 transition-colors group"
    >
      <div className={cn(
        "h-6 w-6 flex-shrink-0 rounded-full flex items-center justify-center",
        agent.status === "online" ? "text-green-500" : 
        agent.status === "busy" ? "text-amber-500" : "text-muted-foreground"
      )}>
        {agent.icon}
      </div>
      <div className="flex flex-col">
        <motion.span
          animate={{
            display: open ? "inline-block" : "none",
            opacity: open ? 1 : 0,
          }}
          className="font-medium whitespace-pre"
        >
          {agent.name}
        </motion.span>
        <motion.span
          animate={{
            display: open ? "inline-block" : "none",
            opacity: open ? 1 : 0,
          }}
          className="text-xs text-muted-foreground whitespace-pre"
        >
          {agent.role}
        </motion.span>
      </div>
      <motion.div
        animate={{
          display: open ? "block" : "none",
          opacity: open ? 1 : 0,
        }}
        className={cn(
          "ml-auto h-2 w-2 rounded-full",
          agent.status === "online" ? "bg-green-500" : 
          agent.status === "busy" ? "bg-amber-500" : "bg-muted"
        )}
      />
    </Link>
  );
};

export const Logo = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-foreground py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-primary rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre"
      >
        MCP Console
      </motion.span>
    </Link>
  );
};

export const LogoIcon = () => {
  return (
    <Link
      href="#"
      className="font-normal flex space-x-2 items-center text-sm text-foreground py-1 relative z-20"
    >
      <div className="h-5 w-6 bg-primary rounded-br-lg rounded-tr-sm rounded-tl-lg rounded-bl-sm flex-shrink-0" />
    </Link>
  );
};
