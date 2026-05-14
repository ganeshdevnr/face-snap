export interface Message {
  id: string;
  conversationId: string;
  authorId: string;
  content: string;
  status: 'sent' | 'delivered' | 'read';
  createdAt: string;
  uiStatus: 'pending' | 'sent' | 'failed';
}
