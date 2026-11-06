'use-client'

import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import  Avatar  from '@/components/ui/avatar';
import VerifiedBadge  from '@/components/ui/VerifiedBadge';
import { Colors, FontSize, Spacing } from '@/constants/theme';
import type { Comment, User } from '@/types/models';
import { formatTimeShort } from '@/utils/format';

type CommentRowProps = {
  comment: Comment;
  author: User;
};

const CommentRow = ({ comment, author }: CommentRowProps) => {
  const [isLiked , setIsLiked] = useState(false);
  const likes = comment.likesCount + (isLiked ? 1 :0);

  const handleLike = () => {
    setIsLiked((prev) => !prev);
  };


  return (
    <View style={styles.row}>
      <Avatar uri={author.avatarUrl} size={40} ring={author.hasActiveStory ? 'story' : 'none'} />

      <View style={styles.body}>
        <Text style={styles.meta}>
          <Text style={styles.username}>{author.username}</Text>
          {author.isVerified && (
            <>
              {' '}
              <VerifiedBadge size={13} />
            </>
          )}
          <Text style={styles.time}> {formatTimeShort(comment.hoursAgo)}</Text>
        </Text>
        <Text style={styles.text}>{comment.text}</Text>
        <View style={styles.links}>
          <Text style={styles.link}>Reply</Text>
          <Text style={styles.link}>See Translation</Text>
        </View>
      </View>

          <Pressable style={styles.like} onPress={handleLike}>
        <Ionicons
          name={isLiked ? 'heart' : 'heart-outline'}
          size={20}
          color={isLiked ? Colors.dark.notification : Colors.dark.textMuted}
        />
        {likes > 0 && <Text style={styles.likeCount}>{likes}</Text>}
      </Pressable>
    </View>
  )
};

export default CommentRow;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: Spacing.md,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  body: { flex: 1, gap: 2 },
  meta: { fontSize: FontSize.small },
  username: { color: Colors.dark.text, fontWeight: '600' },
  time: { color: Colors.dark.textMuted },
  text: { color: Colors.dark.text, fontSize: FontSize.body, lineHeight: 20 },
  links: { flexDirection: 'row', gap: Spacing.lg, paddingTop: Spacing.xs },
  link: { color: Colors.dark.textMuted, fontSize: FontSize.small, fontWeight: '600' },
  like: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs, paddingTop: Spacing.lg },
  likeCount: { color: Colors.dark.textMuted, fontSize: FontSize.small },
});