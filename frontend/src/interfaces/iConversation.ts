import type { iMessage } from "./iMessage";

// FIRMA CONVERSACION
export interface iConversation {
  id: number;
  name: string;
  messages: iMessage[];
}