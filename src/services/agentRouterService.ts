import { callMcpAgent } from "./mcpService";
import { MCPResponse } from "@/types/mcp";

// Capabilities of each agent
const AGENT_KEYWORDS = {
  "github-mcp": [
    "github", "repository", "repo", "pull request", "pr", "issue", "commit", "git", "branch",
    "fork", "clone", "push", "merge", "github actions", "workflow", "gist"
  ],
  "21st-magic": [
    "ui", "component", "design", "button", "card", "interface", "modal", "css", "style",
    "layout", "html", "form", "input", "react", "component", "tailwind", "widget"
  ],
  "perplexity": [
    "search", "find", "research", "what is", "how to", "explain", "tell me about", "information",
    "lookup", "details on", "define", "learn about", "discover", "article", "news"
  ],
  "supabase": [
    "database", "sql", "query", "table", "schema", "postgres", "supabase", "data", "storage",
    "auth", "row", "column", "join", "select", "insert", "update", "delete", "function"
  ],
  "planning": [
    "plan", "todo", "task", "project", "roadmap", "timeline", "milestone", "sprint", "agile",
    "scrum", "kanban", "workflow", "planning", "steps", "implementation", "organize", "strategy"
  ]
};

type AgentId = keyof typeof AGENT_KEYWORDS;

/**
 * Determines the most appropriate agent based on the prompt content.
 * Returns an object with the agent ID and confidence score.
 */
export function determineAgent(prompt: string): { agentId: AgentId; confidence: number } {
  const lowercasePrompt = prompt.toLowerCase();
  const scores: Record<AgentId, number> = {
    "github-mcp": 0,
    "21st-magic": 0,
    "perplexity": 0,
    "supabase": 0,
    "planning": 0
  };
  
  // Calculate score for each agent based on keyword matches
  Object.entries(AGENT_KEYWORDS).forEach(([agentId, keywords]) => {
    keywords.forEach(keyword => {
      if (lowercasePrompt.includes(keyword)) {
        scores[agentId as AgentId] += 1;
      }
    });
  });
  
  // Find the agent with the highest score
  let maxScore = 0;
  let bestAgentId: AgentId = "perplexity"; // Default to perplexity if no clear match
  
  Object.entries(scores).forEach(([agentId, score]) => {
    if (score > maxScore) {
      maxScore = score;
      bestAgentId = agentId as AgentId;
    }
  });
  
  // Calculate confidence as a normalized score (0-1)
  const totalKeywords = Object.values(AGENT_KEYWORDS).flat().length;
  const confidence = Math.min(maxScore / 5, 1); // Cap at 1, normalize by assuming 5 matches is high confidence
  
  return {
    agentId: bestAgentId,
    confidence
  };
}

/**
 * Routes a prompt to the most appropriate agent automatically.
 * Returns the agent used and the response.
 */
export async function autoRoutePrompt(prompt: string): Promise<{
  usedAgentId: AgentId;
  response: MCPResponse;
}> {
  // Determine the most appropriate agent
  const { agentId } = determineAgent(prompt);
  
  // Call the selected agent
  const response = await callMcpAgent(agentId, prompt);
  
  // Return both the agent used and the response
  return {
    usedAgentId: agentId,
    response
  };
}
