/**
 * TEMPORARY scaffolding used only in Segment 3 to test navigation.
 * Every screen replaces this with its real UI in Segment 4, then this file is deleted.
 */
import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Spacing } from '@/constants/theme';

type PlaceholderScreenProps = {
  title: string;
  children?: ReactNode; // test links/buttons
};

export function  PlaceholderScreen({ title, children }: PlaceholderScreenProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      {children}
    </View>
  );
}

export const placeholderLinkStyle = {
  color: Colors.dark.accent,
  fontSize: 16,
  paddingVertical: Spacing.sm,
} as const;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.md,
    backgroundColor: Colors.dark.background,
  },
  title: {
    color: Colors.dark.text,
    fontSize: 22,
    fontWeight: '700',
  },
});