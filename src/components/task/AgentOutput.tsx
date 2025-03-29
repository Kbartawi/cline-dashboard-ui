"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Code, Terminal, Layout, Copy, Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";

type OutputType = "text" | "code" | "ui" | "log";

interface AgentOutputProps {
  content: string;
  type?: OutputType;
  language?: string;
  className?: string;
  timestamp?: Date;
  showTimestamp?: boolean;
  showControls?: boolean;
  onRefresh?: () => void;
}

export function AgentOutput({
  content,
  type = "text",
  language = "javascript",
  className,
  timestamp = new Date(),
  showTimestamp = true,
  showControls = true,
  onRefresh
}: AgentOutputProps) {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const renderIcon = () => {
    switch (type) {
      case "code":
        return <Code className="h-4 w-4" />;
      case "log":
        return <Terminal className="h-4 w-4" />;
      case "ui":
        return <Layout className="h-4 w-4" />;
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (type) {
      case "code":
        return (
          <SyntaxHighlighter
            language={language}
            style={atomDark}
            customStyle={{
              margin: 0,
              padding: "1rem",
              background: "transparent",
              fontSize: "0.875rem",
              borderRadius: "0.375rem",
            }}
            wrapLines={true}
            showLineNumbers={true}
          >
            {String(content)}
          </SyntaxHighlighter>
        );
      case "log":
        return (
          <div className="font-mono text-sm p-4 bg-black/90 text-white/90 rounded-md overflow-auto">
            {content.split("\n").map((line, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {line}
              </div>
            ))}
          </div>
        );
      case "ui":
        return (
          <div className="p-4 bg-background border rounded-md">
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </div>
        );
      default:
        return (
          <div className="p-4 whitespace-pre-wrap text-foreground">
            {content}
          </div>
        );
    }
  };

  return (
    <div className={cn(
      "relative w-full rounded-lg border border-border bg-background font-sans text-sm",
      className
    )}>
      {showControls && (
        <div className="flex justify-between items-center px-4 py-2 border-b border-border">
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {renderIcon()}
            <span className="font-medium">
              {type.charAt(0).toUpperCase() + type.slice(1)} Output
            </span>
            {showTimestamp && (
              <span className="text-xs text-muted-foreground ml-2">
                {formatTime(timestamp)}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            {onRefresh && (
              <button
                onClick={onRefresh}
                className="p-1 hover:bg-secondary rounded-md transition-colors"
                title="Refresh"
              >
                <RefreshCw className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            )}
            <button
              onClick={copyToClipboard}
              className="p-1 hover:bg-secondary rounded-md transition-colors"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check className="h-3.5 w-3.5 text-muted-foreground" />
              ) : (
                <Copy className="h-3.5 w-3.5 text-muted-foreground" />
              )}
            </button>
          </div>
        </div>
      )}
      <div className="overflow-auto max-h-[500px]">
        {renderContent()}
      </div>
    </div>
  );
}
