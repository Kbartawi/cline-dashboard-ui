"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Send } from "lucide-react";

interface TaskPromptPanelProps {
  onSubmit?: (prompt: string, agent: string) => void;
}

const TaskPromptPanel = ({ onSubmit }: TaskPromptPanelProps) => {
  const [prompt, setPrompt] = React.useState("");
  const [selectedAgent, setSelectedAgent] = React.useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && selectedAgent) {
      onSubmit?.(prompt, selectedAgent);
    }
  };

  return (
    <Card className="w-full border-border bg-background">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-medium text-foreground">Task Prompt</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Textarea
            placeholder="Enter your task prompt here..."
            className="min-h-[120px] resize-none border-border bg-background text-foreground placeholder:text-muted-foreground"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          
          <div className="flex items-center gap-4">
            <Select
              value={selectedAgent}
              onValueChange={setSelectedAgent}
            >
              <SelectTrigger className="w-[200px] border-border bg-background text-foreground">
                <SelectValue placeholder="Select MCP agent" />
              </SelectTrigger>
              <SelectContent className="border-border bg-background text-foreground">
                <SelectItem value="agent-1">GitHub</SelectItem>
                <SelectItem value="agent-2">21st Magic</SelectItem>
                <SelectItem value="agent-3">Perplexity</SelectItem>
                <SelectItem value="agent-4">Supabase</SelectItem>
              </SelectContent>
            </Select>
            
            <Button 
              type="submit" 
              className="ml-auto"
              disabled={!prompt.trim() || !selectedAgent}
            >
              <Send className="mr-2 h-4 w-4" />
              Send
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export { TaskPromptPanel };
