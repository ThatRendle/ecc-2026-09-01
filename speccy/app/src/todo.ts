export type Priority = "low" | "medium" | "high";

export interface Todo {
  id: string;
  text: string;
  done: boolean;
  createdAt: string; // ISO timestamp
  dueDate: string | null; // ISO date, or null when not set
  priority: Priority;
}
