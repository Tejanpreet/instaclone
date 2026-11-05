import type { post } from '@/types/models';

// Mock images: picsum.photos returns the same photo for the same "seed".
// 1080×1350 is Instagram's 4:5 portrait size.
const photo = (seed: string) => `https://picsum.photos/seed/${seed}/1080/1350`;

export const posts: post[] = [
  {
    id: 'p1',
    authorId: 'u1',
    collaboratorId: 'u2',
    imageUrls: [photo('nova1'), photo('nova2'), photo('nova3'), photo('nova4')],
    caption: 'Comment "STUDIO" for a link to the full behind-the-scenes breakdown of this shoot 🎬',
    likesCount: 1776,
    commentsCount: 165,
    repostsCount: 120,
    sharesCount: 401,
    hoursAgo: 26,
  },
  {
    id: 'p2',
    authorId: 'u4',
    imageUrls: [photo('pasta1')],
    caption: 'Fresh tagliatelle, brown butter, sage. Simple is best.',
    likesCount: 9821,
    commentsCount: 342,
    repostsCount: 88,
    sharesCount: 1203,
    hoursAgo: 5,
  },
  {
    id: 'p3',
    authorId: 'u3',
    imageUrls: [photo('alps1'), photo('alps2')],
    caption: 'Woke up at 4am for this view and I would do it again 🏔️',
    likesCount: 2310,
    commentsCount: 87,
    repostsCount: 14,
    sharesCount: 96,
    hoursAgo: 49,
  },
  {
    id: 'p4',
    authorId: 'u5',
    imageUrls: [photo('street1'), photo('street2'), photo('street3')],
    caption: 'Rainy nights downtown. Shot on 35mm.',
    likesCount: 640,
    commentsCount: 21,
    repostsCount: 3,
    sharesCount: 12,
    hoursAgo: 72,
  },
];

export const getPostById = (id: string): post | undefined  => {
  return posts.find((post) => post.id === id);
}