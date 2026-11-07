import { useWindowDimensions } from 'react-native';

export const GridColumns = 3;
export const GridGap = 2;

// A custom hook: reusable logic (not UI) that any screen with a grid can call.
// 3 tiles + 2 gaps must exactly fill the screen width.
export function useGridTileWidth(): number {
  const { width } = useWindowDimensions();
  return (width - GridGap * (GridColumns - 1)) / GridColumns;
}