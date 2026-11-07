import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import  ProfileView  from '@/components/profile/ProfileView';
import { Colors, Spacing } from '@/constants/theme';
import  {CurrentUserID, getUserById } from '@/data/users';

const ProfileScreen = () => {
  const insets = useSafeAreaInsets();
  const CurrentUser = getUserById(CurrentUserID);

  if (!CurrentUser){
    return null;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Ionicons name="add" size={30} color={Colors.dark.text} />
        <View style={styles.usernameRow}>
          <Text style={styles.username}>{ CurrentUser.username}</Text>
          <Ionicons name="chevron-down" size={16} color={Colors.dark.text} />
        </View>
        <Ionicons name="menu" size={30} color={Colors.dark.text} />
      </View>
      <ProfileView user={CurrentUser} isOwnProfile />
    </View>
  );

}

export default ProfileScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  usernameRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  username: { color: Colors.dark.text, fontSize: 22, fontWeight: '700' },
});