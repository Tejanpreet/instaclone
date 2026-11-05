import type { User } from "@/types/models";

const avatar = (n: number ) => {return `https://i.pravatar.cc/150?img=${n}`};

export const CURRENT_USER_ID = 'u0';

export const users : User[] = [
  {
    id: 'u0',
    username: 'jordan.dev',
    fullName: 'Jordan Lee',
    avatarUrl: avatar(12),
    isVerified: false,
    hasActiveStory: false,
    isFollowing: false,
    bio: 'Building things with React Native 📱\nCalgary, AB',
    postsCount: 24,
    followersCount: 812,
    followingCount: 301,
  },
  {
    id: 'u1',
    username: 'nova.creates',
    fullName: 'Nova Ramirez',
    avatarUrl: avatar(47),
    isVerified: true,
    hasActiveStory: true,
    isFollowing: false,
    bio: '✨ Visual artist & creative director\n📍 Toronto\nCollabs → @studio.nova',
    postsCount: 1240,
    followersCount: 2_400_000,
    followingCount: 512,
  },
  {
    id: 'u2',
    username: 'studio.nova',
    fullName: 'Studio Nova',
    avatarUrl: avatar(5),
    isVerified: true,
    hasActiveStory: false,
    isFollowing: false,
    bio: 'Creative studio. DM for collabs.',
    postsCount: 310,
    followersCount: 98_200,
    followingCount: 44,
  },
  {
    id: 'u3',
    username: 'lena.travels',
    fullName: 'Lena Fischer',
    avatarUrl: avatar(32),
    isVerified: false,
    hasActiveStory: true,
    isFollowing: true,
    bio: '🌍 34 countries and counting',
    postsCount: 402,
    followersCount: 15_300,
    followingCount: 880,
  },
  {
    id: 'u4',
    username: 'chef.marco',
    fullName: 'Marco Bellini',
    avatarUrl: avatar(53),
    isVerified: true,
    hasActiveStory: true,
    isFollowing: true,
    bio: '🍝 Pasta is a love language',
    postsCount: 890,
    followersCount: 640_000,
    followingCount: 210,
  },
  {
    id: 'u5',
    username: 'urban.lens',
    fullName: 'Kai Tanaka',
    avatarUrl: avatar(15),
    isVerified: false,
    hasActiveStory: true,
    isFollowing: true,
    bio: '📷 Street photography',
    postsCount: 156,
    followersCount: 7_420,
    followingCount: 390,
  },
  {
    id: 'u6',
    username: 'maya.moves',
    fullName: 'Maya Singh',
    avatarUrl: avatar(44),
    isVerified: false,
    hasActiveStory: true,
    isFollowing: true,
    bio: 'Dancer • Coach',
    postsCount: 233,
    followersCount: 21_900,
    followingCount: 612,
  },
]

export const getUserById = (id : string ) : User | undefined => {
  return users.find((user) => user.id === id);
}

export const getUserByUsername = (username : string) : User | undefined => {
  return users.find((user) => user.username === username);
}

