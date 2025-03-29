"use client";

import React, { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { atomDark } from "react-syntax-highlighter/dist/cjs/styles/prism";
import { Code, Terminal, Layout, Copy, Check, RefreshCw, FileJson, AlertCircle, FileText } from "lucide-react";
import { cn } from "@/lib/utils";

type OutputType = "text" | "code" | "ui" | "log" | "json" | "error";

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

  const formatJsonIfNeeded = (content: string, type: OutputType): string => {
    if (type !== "json") return content;
    try {
      const parsedJson = JSON.parse(content);
      return JSON.stringify(parsedJson, null, 2);
    } catch (e) {
      return content; // Return original content if not valid JSON
    }
  };

  const renderIcon = () => {
    switch (type) {
      case "code":
        return <Code className="h-4 w-4" />;
      case "log":
        return <Terminal className="h-4 w-4" />;
      case "ui":
        return <Layout className="h-4 w-4" />;
      case "json":
        return <FileJson className="h-4 w-4" />;
      case "error":
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      default:
        return <FileText className="h-4 w-4" />;
    }
  };

  const renderContent = () => {
    // Format JSON if needed
    const formattedContent = formatJsonIfNeeded(content, type);

    switch (type) {
      case "code":
      case "json":
        return (
          <SyntaxHighlighter
            language={type === "json" ? "json" : language}
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
            {String(formattedContent)}
          </SyntaxHighlighter>
        );
      case "log":
        return (
          <div className="font-mono text-sm p-4 bg-black/90 text-white/90 rounded-md overflow-auto">
            {formattedContent.split("\n").map((line, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {line}
              </div>
            ))}
          </div>
        );
      case "ui":
        return (
          <div className="p-4 bg-background border rounded-md">
            <div dangerouslySetInnerHTML={{ __html: formattedContent }} />
          </div>
        );
      case "error":
        return (
          <div className="p-4 whitespace-pre-wrap text-red-600 dark:text-red-400 bg-red-50 dark:bg-red-950/10 rounded-md">
            {formattedContent}
          </div>
        );
      default:
        return (
          <div className="p-4 whitespace-pre-wrap text-foreground">
            {formattedContent}
          </div>
        );
    }
  };

  // Determine output border color based on type
  const getBorderClass = () => {
    if (type === "error") return "border-red-300";
    return "border-border";
  };

  return (
    <div className={cn(
      "relative w-full rounded-lg border bg-background font-sans text-sm",
      getBorderClass(),
      className
    )}>
      {showControls && (
        <div className={cn(
          "flex justify-between items-center px-4 py-2 border-b",
          type === "error" ? "border-red-300" : "border-border"
        )}>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            {renderIcon()}
            <span className="font-medium">
              {type.charAt(0).toUpperCase() + type.slice(1)} {type === "error" ? "Message" : "Output"}
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
