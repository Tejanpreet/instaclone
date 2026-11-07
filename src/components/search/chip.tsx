import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors, FontSize, Spacing } from '@/constants/theme';

type ChipProps = {
  label?: string;
  icon?: ReactNode;
  selected?: boolean;
  onPress?: () => void;
};

const Chip = ({ label, icon, selected = false, onPress }: ChipProps) => {
  return (
    <Pressable onPress={onPress} style={[styles.chip, selected && styles.selected]}>
      {icon}
      {label && <Text style={styles.label}>{label}</Text>}
    </Pressable>
  )
}

export default Chip;

const styles = StyleSheet.create({
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
    height: 36,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: Colors.dark.input,
  },
  selected: { backgroundColor: Colors.dark.input },
  label: { color: Colors.dark.text, fontSize: FontSize.body, fontWeight: '600' },
});