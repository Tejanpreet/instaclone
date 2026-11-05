/**
 * Design tokens for the app.
 * Every colour below was sampled from the reference screenshots (dark mode).
 * Screens and components must read from here 
 */

export const Colors = {
  dark: {
    background: '#0C0F14', // app + tab bar background
    surface: '#2B2F35', // buttons: Follow, Following, Message
    input: '#25282E', // search bar, selected chip
    sheet: '#191B1F', // comments bottom sheet
    text: '#F8F9F9', // primary text
    textMuted: '#A2A9B4', // "Reply", "See Translation", timestamps
    link: '#85A1F9', // @mentions in bio
    accent: '#708DF8', // "See all"
    verified: '#4295F6', // blue verified badge
    notification: '#FF0028', // red dots on tab bar, liked heart
    dotActive: '#5C77F7', // carousel dot (current image)
    dotInactive: '#48505B', // carousel dot (other images)
    storySeen: '#57606B', // grey ring on "Your story"
  },
} as const;

// A type that is the *shape* of one palette
export type Palette = (typeof Colors)['dark'];

// Instagram story ring, sampled bottom-left (yellow) → top-right (purple)
export const StoryGradient = ['#F8D046', '#F2A73B', '#EA3930', '#E531A1', '#D32DC5'] as const;

// 4-point spacing scale: every margin/padding in the app uses one of these.
export const Spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
} as const;

export const FontSize = {
  small: 13, // story labels, timestamps
  body: 15, // usernames, captions, counts
  logo: 36, // "Instagram" wordmark
} as const;

export const Fonts = {
  logo: 'GrandHotel_400Regular',
} as const;