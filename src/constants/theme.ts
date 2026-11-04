/** 
 * Design tokens for the app.
 * Every colour below was sampled from the reference screenshots (dark mode).
 * Screens and components must read from here — never hard-code a hex value.
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
    notification: '#FF0028', // red dots on tab bar
  },
} as const ;

// A type that is the *shape* of one palette, e.g. { background: string; ... }
export type Pallete = (typeof Colors)['dark'];

// 4-point spacing scale
export const Spacing = {
  xs : 4 ,
  sm : 8 ,
  md : 12 ,
  lg : 16 ,
  xl : 24 , 
} as const;



