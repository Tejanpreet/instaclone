import type { Comment } from "@/types/models";

export const comments: Comment[] = [
  { id: 'c1', postId: 'p1', userId: 'u2', text: 'The greatest shoot we have done so far 🙌', likesCount: 3, hoursAgo: 24 },
  { id: 'c2', postId: 'p1', userId: 'u5', text: 'The lighting in the second photo is unreal. What lens was this?', likesCount: 2, hoursAgo: 23 },
  { id: 'c3', postId: 'p1', userId: 'u3', text: 'Really enjoyed this one!! 💜❤️', likesCount: 2, hoursAgo: 22 },
  { id: 'c4', postId: 'p1', userId: 'u6', text: 'I love all of your content! 🤩✅', likesCount: 1, hoursAgo: 21 },
  { id: 'c5', postId: 'p1', userId: 'u4', text: 'STUDIO', likesCount: 1, hoursAgo: 20 },
  { id: 'c6', postId: 'p2', userId: 'u3', text: 'Need this recipe immediately 😍', likesCount: 14, hoursAgo: 4 },
  { id: 'c7', postId: 'p2', userId: 'u1', text: 'Brown butter makes everything better', likesCount: 9, hoursAgo: 3 },
  { id: 'c8', postId: 'p3', userId: 'u5', text: '4am is wild but worth it 🏔️', likesCount: 5, hoursAgo: 40 },
  { id: 'c9', postId: 'p4', userId: 'u6', text: 'Film never misses 📷', likesCount: 2, hoursAgo: 60 },
];

export const getCommentsForPost = (postId: string): Comment[] => {
  return comments.filter((comment) => comment.postId === postId);
};


