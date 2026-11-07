import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import  Avatar  from '@/components/ui/avatar';
import VerifiedBadge  from '@/components/ui/VerifiedBadge';
import { Colors, FontSize, Spacing } from '@/constants/theme';
import type { User } from '@/types/models';
import { formatCompact } from '@/utils/format';

type UserRowProps = {
  user: User;
  onRemove?: () => void; // only Recent rows can be removed
};

const UserRow = ({ user, onRemove }: UserRowProps)=> {

    const openProfile = () =>{
    return router.push({ pathname: '/user/[username]', params: { username: user.username } });
    }

    const subtitle = user.isFollowing
    ? `${user.fullName} • Following`
    : `${user.fullName} • ${formatCompact(user.followersCount)} followers`;

    return (
    <Pressable style={styles.row} onPress={openProfile}>
      <Avatar uri={user.avatarUrl} size={56} ring={user.hasActiveStory ? 'story' : 'none'} />
      <View style={styles.text}>
        <Text style={styles.username} numberOfLines={1}>
          {user.username}
          {user.isVerified && (
            <>
              {' '}
              <VerifiedBadge />
            </>
          )}
        </Text>
        <Text style={styles.subtitle} numberOfLines={1}>
          {subtitle}
        </Text>
      </View>
      {onRemove && (
        <Pressable onPress={onRemove} hitSlop={12}>
          <Ionicons name="close" size={24} color={Colors.dark.textMuted} />
        </Pressable>
      )}
    </Pressable>
    );
}

export default UserRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  text: { flex: 1 },
  username: { color: Colors.dark.text, fontSize: FontSize.body, fontWeight: '600' },
  subtitle: { color: Colors.dark.textMuted, fontSize: FontSize.body - 1 },
});