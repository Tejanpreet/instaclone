# InstaClone – Multi-Screen Expo App

A recreation of **Instagram's** core mobile experience (dark mode), built with **Expo SDK 58, Expo Router and TypeScript**.

## Reference app
Instagram (iOS, dark mode). Reference screenshots are in [`/screenshots`](./screenshots).

## Screens
| Screen | Route | Type |
|---|---|---|
| Home feed (stories + posts) | `/` | Tab |
| Reels (vertical paging) | `/reels` | Tab |
| Messages inbox | `/messages` | Tab |
| Explore grid | `/explore` | Tab |
| My profile | `/profile` | Tab |
| Search (recent + live filter) | `/search` | Stack |
| Post detail | `/post/[id]` | Stack + param |
| User profile | `/user/[username]` | Stack + param |
| Comments (bottom sheet) | `/comments/[id]` | Stack (formSheet) + param |

## Navigation
Tabs inside a root Stack. Detail screens are pushed **over** the tab bar, matching Instagram.
Comments open as a native bottom sheet (`presentation: 'formSheet'`).
I used the JS `Tabs` navigator (not `NativeTabs`) so the tab bar could match Instagram exactly: icon-only, avatar tab, unread dots.

## Dynamic content
- **Lists:** `FlatList` everywhere (feed, stories, comments, grids with `numColumns`, reels with `pagingEnabled`)
- **Navigation params:** post id, username and comment post id passed through dynamic routes
- **Reusable components:** `Avatar`, `PostCard`, `GridTile`, `ProfileView` (shared by own + other profiles), `UserRow`, `Chip`…
- **State:** like/save, image carousel index, follow/unfollow, posting comments, live search, removing recent searches

## Design
All colours were sampled from the reference screenshots and stored as design tokens in `src/constants/theme.ts` (colours, spacing, font sizes). No hard-coded colours in components.

## Project structure
src/
├── app/          # routes only (Expo Router)
├── components/   # reusable UI, grouped by feature
├── constants/    # design tokens
├── data/         # mock data + lookup helpers
├── types/        # TypeScript models
└── utils/        # pure formatting helpers

## Run it
npm install
npx expo start
Scan the QR code with Expo Go (iOS or Android).

## Notes
All usernames and images are mock data (pravatar.cc / picsum.photos). No real user data is used.