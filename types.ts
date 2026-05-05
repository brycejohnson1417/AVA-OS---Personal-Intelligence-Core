export enum AppView {
  DASHBOARD = 'DASHBOARD',
  OBSIDIAN_GRAPH = 'OBSIDIAN_GRAPH',
  ONBOARDING = 'ONBOARDING',
  INTERVIEW = 'INTERVIEW',
  SETTINGS = 'SETTINGS'
}

export interface Node {
  id: string;
  group: number;
  label: string;
  radius?: number;
}

export interface Link {
  source: string;
  target: string;
  value: number;
}

export interface GraphData {
  nodes: Node[];
  links: Link[];
}

export interface Message {
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export interface SystemStatus {
  memory: string; // e.g., "Optimized"
  embeddings: string; // e.g., "Active"
  connection: string; // e.g., "Secure"
  battery: number;
}