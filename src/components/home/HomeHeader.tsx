import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, Fonts, FontSize, Spacing } from '@/constants/theme';

const HomeHeader = () => {
  return (
      <View style={styles.row}>
      <Ionicons name="add" size={32} color={Colors.dark.text} />

      <View style={styles.logoRow}>
        <Text style={styles.logo}>Instagram</Text>
        <Ionicons name="chevron-down" size={16} color={Colors.dark.text} />
      </View>

      <Ionicons name="heart-outline" size={28} color={Colors.dark.text} />
    </View>
  );
};

export default HomeHeader;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row', // children side by side
    alignItems: 'center', // vertically centred
    justifyContent: 'space-between', // push to the edges, logo in the middle
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  logoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  logo: {
    fontFamily: Fonts.logo,
    fontSize: FontSize.logo,
    color: Colors.dark.text,
  },
});