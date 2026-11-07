import type { Conversation } from '@/types/models';

export const conversations: Conversation[] = [
  { id: 'm1', userId: 'u3', lastMessage: 'Sent you the hiking route 🏔️', hoursAgo: 0, isUnread: true },
  { id: 'm2', userId: 'u5', lastMessage: 'Those night shots were 🔥', hoursAgo: 2, isUnread: true },
  { id: 'm3', userId: 'u6', lastMessage: 'See you at the studio tomorrow', hoursAgo: 5, isUnread: false },
  { id: 'm4', userId: 'u4', lastMessage: 'You: Recipe please!!', hoursAgo: 26, isUnread: false },
  { id: 'm5', userId: 'u1', lastMessage: 'Thanks for the support 🙏', hoursAgo: 72, isUnread: false },
  { id: 'm6', userId: 'u2', lastMessage: 'You: Love the new collab', hoursAgo: 200, isUnread: false },
];