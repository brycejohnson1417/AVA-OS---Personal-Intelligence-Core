import { GraphData } from "./types";

export const INITIAL_GRAPH_DATA: GraphData = {
  nodes: [
    { id: "Ava Core", group: 1, label: "Ava OS Core", radius: 20 },
    { id: "Local Sandbox", group: 2, label: "Local Sandbox", radius: 10 },
    { id: "Knowledge Vault", group: 2, label: "Personal Knowledge Vault", radius: 15 },
    { id: "Task Orchestration", group: 2, label: "Task Orchestration", radius: 12 },
    { id: "Work Projects", group: 3, label: "Active Projects", radius: 15 },
    { id: "Agent Manager", group: 1, label: "Agent Manager", radius: 12 },
    { id: "Daily Briefing", group: 3, label: "Daily Briefing", radius: 10 },
    { id: "Documentation", group: 3, label: "Documentation Builder", radius: 8 },
    { id: "Inbox Zero", group: 3, label: "Inbox Engine", radius: 6 },
    { id: "Calendar", group: 3, label: "Schedule Sync", radius: 6 },
    { id: "Cloud Backup", group: 2, label: "Cloud Sync", radius: 8 },
    { id: "API Budget", group: 1, label: "API Budget Limit", radius: 8 },
    { id: "Primary LLM", group: 2, label: "Primary Model", radius: 6 },
    { id: "Drafting LLM", group: 2, label: "Drafting Model", radius: 6 },
    { id: "Vision LLM", group: 2, label: "Vision Processing", radius: 6 },
    { id: "Semantic Memory", group: 1, label: "Vector Memory Bank", radius: 10 },
  ],
  links: [
    { source: "Ava Core", target: "Local Sandbox", value: 5 },
    { source: "Ava Core", target: "Knowledge Vault", value: 5 },
    { source: "Ava Core", target: "Task Orchestration", value: 3 },
    { source: "Ava Core", target: "Agent Manager", value: 4 },
    { source: "Agent Manager", target: "Primary LLM", value: 2 },
    { source: "Agent Manager", target: "Drafting LLM", value: 2 },
    { source: "Agent Manager", target: "Vision LLM", value: 2 },
    { source: "Agent Manager", target: "API Budget", value: 1 },
    { source: "Ava Core", target: "Work Projects", value: 4 },
    { source: "Work Projects", target: "Daily Briefing", value: 3 },
    { source: "Daily Briefing", target: "Documentation", value: 2 },
    { source: "Documentation", target: "Inbox Zero", value: 1 },
    { source: "Documentation", target: "Calendar", value: 1 },
    { source: "Knowledge Vault", target: "Cloud Backup", value: 2 },
    { source: "Knowledge Vault", target: "Semantic Memory", value: 3 },
  ]
};

export const USER_CONTEXT_DUMP = `
Plan for optimal productivity alignment. Start with Semantic Memory synchronization of the personal knowledge vault. 
Initialize daily briefing by 07:30 AM local time. Update core operating system environment. 
Setup OAuth endpoints for cloud services, long-term memory via embeddings, and cross-device validation.
Review system health and determine if routine cache wipes are necessary.
Manage compute API quota (strict limit set). 
Maintain vector database for cross-agentic communication and persistent user context state.
Gatekeeper agent initialized to filter notifications. 
Mobile-first command routing. Work orchestration over manual execution.
Activate anomaly detection for double-booked calendar events and implement inbox-zero processing protocols.
Distributed personal agent architecture enabled.
`;
