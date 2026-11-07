import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';

import Avatar  from '@/components/ui/avatar';
import { Colors, FontSize, Spacing } from '@/constants/theme';
import { getUserByUsername } from '@/data/users';
import type { User } from '@/types/models';
import { formatCompact } from '@/utils/format';

export type ProfileTab = 'grid' | 'reels' | 'reposts' | 'tagged';

const TABS: { key: ProfileTab; icon: keyof typeof Ionicons.glyphMap }[] = [
  { key: 'grid', icon: 'grid-outline' },
  { key: 'reels', icon: 'play-outline' },
  { key: 'reposts', icon: 'repeat-outline' },
  { key: 'tagged', icon: 'person-circle-outline' },
];

const HighLights = ['Studio', 'Travel', 'Food', 'BTS', 'Q&A'];

type ProfileHeaderProps = {
  user: User;
  postsCount: number;
  isOwnProfile: boolean;
  isFollowing: boolean;
  onToggleFollow: () => void;
  activeTab: ProfileTab;
  onChangeTab: (tab: ProfileTab) => void;
};

type ProfileButtonProps = {
  label: string;
  primary?: boolean;
  chevron?: boolean;
  onPress?: () => void;
};

const Stat = ({ value, label }: { value: string; label: string }) => {
  return (
    <View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

const ProfileButton = ({ label, primary = false, chevron = false, onPress }: ProfileButtonProps) => {
  return (
    <Pressable style={[styles.button, primary && styles.buttonPrimary]} onPress={onPress}>
      <Text style={styles.buttonText}>{label}</Text>
      {chevron && <Ionicons name="chevron-down" size={16} color={Colors.dark.text} />}
    </Pressable>
  );
}

// Splits the bio on @mentions so they can be coloured and tapped.
const Bio = ({ text }: { text: string }) => {
  const parts = text.split(/(@[\w.]+)/g);

  return (
    <Text style={styles.bio}>
      {parts.map((part, index) => {

        if (!part.startsWith('@')) {
          return part
        };

        const mentioned = getUserByUsername(part.slice(1));
        return (
          <Text
            key={index}
            style={styles.mention}
            onPress={() =>
              mentioned &&
              router.push({ pathname: '/user/[username]', params: { username: mentioned.username } })
            }>
            {part}
          </Text>
        );
      })}
    </Text>
  );
}



const ProfileHeader = ({
  user,
  postsCount,
  isOwnProfile,
  isFollowing,
  onToggleFollow,
  activeTab,
  onChangeTab,
}: ProfileHeaderProps) => {

  // Derived, not stored: take the following count without me, then add 1 if I follow now.
   const followersWithoutMe = user.followersCount - (user.isFollowing ? 1 : 0);
  const followers = followersWithoutMe + (isFollowing ? 1 : 0);

  return (
    <View>
      <View style={styles.topRow}>
        <Avatar uri={user.avatarUrl} size={96} ring={user.hasActiveStory ? 'story' : 'none'} />
        <View style={styles.topRight}>
          <Text style={styles.fullName}>{user.fullName}</Text>
          <View style={styles.stats}>
            <Stat value={formatCompact(postsCount)} label="posts" />
            <Stat value={formatCompact(followers)} label="followers" />
            <Stat value={formatCompact(user.followingCount)} label="following" />
          </View>
        </View>
      </View>

      <View style={styles.buttons}>
        {isOwnProfile ? (
          <>
            <ProfileButton label="Edit profile" />
            <ProfileButton label="Share profile" />
          </>
        ) : (
          <>
            <ProfileButton
              label={isFollowing ? 'Following' : 'Follow'}
              primary={!isFollowing}
              chevron={isFollowing}
              onPress={onToggleFollow}
            />
            <ProfileButton label="Message" />
          </>
        )}
        <Pressable style={styles.iconButton}>
          <Ionicons name="person-add-outline" size={18} color={Colors.dark.text} />
        </Pressable>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.highlights}>
        {HighLights.map((title) => (
          <View key={title} style={styles.highlight}>
            <Avatar uri={`https://picsum.photos/seed/hl-${user.id}-${title}/200/200`} size={72} ring="seen" />
            <Text style={styles.highlightLabel} numberOfLines={1}>
              {title}
            </Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.tabs}>
        {TABS.map((tab) => {
          const isActive = tab.key === activeTab;
          return (
            <Pressable
              key={tab.key}
              style={[styles.tab, isActive && styles.tabActive]}
              onPress={() => onChangeTab(tab.key)}>
              <Ionicons name={tab.icon} size={26} color={isActive ? Colors.dark.text : Colors.dark.textMuted} />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default ProfileHeader;

const styles = StyleSheet.create({
  topRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xl,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.sm,
  },
  topRight: { flex: 1, gap: Spacing.sm },
  fullName: { color: Colors.dark.text, fontSize: FontSize.body + 1, fontWeight: '600' },
  stats: { flexDirection: 'row', justifyContent: 'space-between' },
  statValue: { color: Colors.dark.text, fontSize: 17, fontWeight: '700' },
  statLabel: { color: Colors.dark.text, fontSize: FontSize.body },
  bio: {
    color: Colors.dark.text,
    fontSize: FontSize.body,
    lineHeight: 20,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
  },
  mention: { color: Colors.dark.link },
  buttons: {
    flexDirection: 'row',
    gap: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.lg,
  },
  button: {
    flex: 1, // buttons share the row equally
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.xs,
    height: 36,
    borderRadius: 10,
    backgroundColor: Colors.dark.surface,
  },
  buttonPrimary: { backgroundColor: Colors.dark.verified },
  buttonText: { color: Colors.dark.text, fontSize: FontSize.body, fontWeight: '600' },
  iconButton: {
    width: 36,
    height: 36,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.dark.surface,
  },
  highlights: { gap: Spacing.lg, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.lg },
  highlight: { width: 72, alignItems: 'center', gap: Spacing.xs },
  highlightLabel: { color: Colors.dark.text, fontSize: FontSize.small },
  tabs: { flexDirection: 'row' },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  tabActive: { borderBottomColor: Colors.dark.text },
});