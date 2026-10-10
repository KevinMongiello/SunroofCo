export interface ChatBoxMessage {
  id: string;
  role: ChatBoxMessageRole;
  content: string;
}
export const ChatBoxMessageRoles = {
  ASSISTANT: 'assistant',
  USER: 'user',
  NOTIFICATION: 'notification',
  ERROR: 'error',
  LOADING: 'loading',
} as const;

export type ChatBoxMessageRole =
  (typeof ChatBoxMessageRoles)[keyof typeof ChatBoxMessageRoles];
