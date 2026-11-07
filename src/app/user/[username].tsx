import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams } from 'expo-router';
import { StyleSheet, Text, View } from 'react-native';

import ProfileView  from '@/components/profile/ProfileView';
import VerifiedBadge  from '@/components/ui/VerifiedBadge';
import { Colors, FontSize, Spacing } from '@/constants/theme';
import {CurrentUserID, getUserByUsername } from '@/data/users';

const UserProfileScreen = () => {
  const { username } = useLocalSearchParams<{ username: string }>();
  const user = getUserByUsername(username);

  // gaurd clause 
  if (!user) {
    return (
      <View style={styles.center}>
        <Stack.Screen options={{ title: username }} />
        <Text style={styles.muted}>User not found</Text>
      </View>
    );
  }

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={styles.titleRow}>
              <Text style={styles.title}>{user.username}</Text>
              {user.isVerified && <VerifiedBadge size={18} />}
            </View>
          ),
          headerRight: () => (
            <View style={styles.headerIcons}>
              <Ionicons name="notifications-outline" size={24} color={Colors.dark.text} />
              <Ionicons name="ellipsis-horizontal" size={24} color={Colors.dark.text} />
            </View>
          ),
        }}
      />
      <ProfileView user={user} isOwnProfile={user.id === CurrentUserID} />
    </>
  );
}

export default UserProfileScreen;

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  muted: { color: Colors.dark.textMuted, fontSize: FontSize.body },
  titleRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  title: { color: Colors.dark.text, fontSize: 20, fontWeight: '700' },
  headerIcons: { flexDirection: 'row', gap: Spacing.xl },
});
