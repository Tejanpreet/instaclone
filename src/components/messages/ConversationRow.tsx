import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import Avatar  from '@/components/ui/avatar';
import { Colors, FontSize, Spacing } from '@/constants/theme';
import type { Conversation, User } from '@/types/models';
import { formatTimeShort } from '@/utils/format';

type ConversationRowProps = {
  conversation: Conversation;
  user: User;
};

const ConversationRow = ({conversation, user }: ConversationRowProps) => {
  const { isUnread } = conversation;

  return (
    <View style={styles.row}>
      <Avatar uri={user.avatarUrl} size={56} ring={user.hasActiveStory ? 'story' : 'none'} />
      <View style={styles.text}>
        <Text style={[styles.name, isUnread && styles.bold]} numberOfLines={1}>
          {user.fullName}
        </Text>
        <Text style={[styles.preview, isUnread && styles.unreadPreview]} numberOfLines={1}>
          {conversation.lastMessage} · {formatTimeShort(conversation.hoursAgo)}
        </Text>
      </View>
      {isUnread && <View style={styles.dot} />}
      <Ionicons name="camera-outline" size={26} color={Colors.dark.textMuted} />
    </View>
  )

}

export default ConversationRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  text: { flex: 1 },
  name: { color: Colors.dark.text, fontSize: FontSize.body },
  bold: { fontWeight: '700' },
  preview: { color: Colors.dark.textMuted, fontSize: FontSize.body - 1 },
  unreadPreview: { color: Colors.dark.text, fontWeight: '600' },
  dot: { width: 8, height: 8, borderRadius: 4, backgroundColor: Colors.dark.verified },
});