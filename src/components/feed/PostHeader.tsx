import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import Avatar  from '@/components/ui/avatar';
import  VerifiedBadge  from '@/components/ui/VerifiedBadge';
import { Colors, FontSize, Spacing } from '@/constants/theme';
import type { User } from '@/types/models';
import { CurrentUserID } from '@/data/users';

type PostHeaderProps = {
  author: User;
  collaborator?: User;
  showFollow?: boolean;
};

const UserName = ( {user} : {user : User}) => {
   const openProfile = () => {
    router.push({pathname: '/user/[username]' , params : {username : user.username}});
   }

   return (
    <Text style={styles.username} onPress={openProfile}>
      {user.username}
      {user.isVerified && (
        <>
          {' '}
          <VerifiedBadge />
        </>
      )}
    </Text>
   );
}

const PostHeaderProps = ({author, collaborator, showFollow = true} : PostHeaderProps ) => {
  return (
       <View style={styles.row}>
      {collaborator ? (
        // Two overlapping avatars for collab posts
        <View style={styles.collabAvatars}>
          <View style={styles.backAvatar}>
            <Avatar uri={collaborator.avatarUrl} size={26} />
          </View>
          <View style={styles.frontAvatar}>
            <Avatar uri={author.avatarUrl} size={26} />
          </View>
        </View>
      ) : (
        <Avatar uri={author.avatarUrl} size={36} ring={author.hasActiveStory ? 'story' : 'none'} />
      )}

      {/* ONE line of nested text: if too long, it ends in "…" like Instagram */}
      <Text style={styles.names} numberOfLines={1}>
        <UserName user={author} />
        {collaborator && (
          <>
            <Text style={styles.and}> and </Text>
            <UserName user={collaborator} />
          </>
        )}
      </Text>

      {showFollow && !author.isFollowing && author.id !== CurrentUserID && (
        <Pressable style={styles.followButton}>
          <Text style={styles.followText}>Follow</Text>
        </Pressable>
      )}

      <Ionicons name="reorder-two-outline" size={26} color={Colors.dark.text} />
    </View>
  );
}

export default PostHeaderProps;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.md,
  },
  collabAvatars: { width: 36, height: 36 },
  backAvatar: { position: 'absolute', top: 0, right: 0 },
  frontAvatar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: Colors.dark.background,
  },
  names: {
    flex: 1, // take all remaining space, pushing Follow + menu to the right
    color: Colors.dark.text, // colour of the "…" when the line is cut off
    fontSize: FontSize.body,
  },
  username: { color: Colors.dark.text, fontSize: FontSize.body, fontWeight: '600' },
  and: { color: Colors.dark.text, fontSize: FontSize.body },
  followButton: {
    backgroundColor: Colors.dark.surface,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm - 2,
    borderRadius: 8,
  },
  followText: { color: Colors.dark.text, fontSize: FontSize.body, fontWeight: '600' },
});
