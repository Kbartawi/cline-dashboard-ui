export type AgentStatus = 'online' | 'offline' | 'busy' | 'error';

export interface MCPAgent {
  id: string;
  name: string;
  description: string;
  role?: string;
  capabilities: string[];
  status: AgentStatus;
  icon?: React.ReactNode;
}

export interface MCPTask {
  id: string;
  agentId: string;
  prompt: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  completedAt?: Date;
  response?: MCPResponse;
}

export type ResponseType = 'text' | 'code' | 'ui' | 'log' | 'json' | 'error';

export interface MCPResponse {
  type: ResponseType;
  content: string;
  metadata?: Record<string, any>;
  timestamp?: Date;
}
