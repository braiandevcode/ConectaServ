// FIRMA MENSAJES EMISOR - RECEPTOR
export interface iMessage {
  id: number;
  text: string;
  sender: 'me' | 'other';
}