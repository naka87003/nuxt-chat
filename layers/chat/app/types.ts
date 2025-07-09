export type ChatMessage = {
  id: string;
  role: "user" | "assistant";
  content: string;
};

export type Chat = {
  id: string;
  title: string;
  messages: ChatMessage[];
  projectId?: string;
  createdAt: Date;
  updatedAt: Date;
};

export type Project = {
  id: string;
  name: string;
};
