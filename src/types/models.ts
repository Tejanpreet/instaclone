/**
 * The data shapes used across the app
 * what a User or Post looks like, so TypeScript can check every use.
 */

export type User = {
  id : string;
  username : string;
  fullName : string;
  avatarUrl : string;
  isVerified : boolean;
  hasActiveStory : boolean;
  isFollowing: boolean; // // does the current user follow them?
  bio: string;
  postsCount : number;
  followersCount :  number;
  followingCount: number;
};

export type  post = {
   id: string;
  authorId: string; // points to a User.id
  collaboratorId?: string; // optional: "garyvee and dadgang.co" style posts
  imageUrls: string[]; // more than one = carousel
  caption: string;
  likesCount: number;
  commentsCount: number;
  repostsCount: number;
  sharesCount: number;
  hoursAgo: number; // stored as a number so it never goes stale
  viewsCount?: number; // shown on Explore tiles
  isPinned?: boolean; // pinned to the top of the author's profile
}

export type Comment = {
  id: string;
  postId: string; // which post it belongs to
  userId: string; // who wrote it
  text: string;
  likesCount: number;
  hoursAgo: number;
};

export type Conversation = {
  id: string;
  userId: string; // the other person
  lastMessage: string;
  hoursAgo: number;
  isUnread: boolean;
};