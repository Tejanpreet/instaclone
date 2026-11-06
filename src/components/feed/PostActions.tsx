'use-client'

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, FontSize, Spacing } from '@/constants/theme';
import type {post}  from '@/types/models';
import { formatWithCommas } from '@/utils/format';

const ICON_SIZE = 26;

type PostActionsProps = {
  post : post;
}

const PostActions = ({post} : PostActionsProps) => {

    // Local UI state
    const [isLiked, setIsLiked] = useState(false);
    const [isSaved, setIsSaved] = useState(false);

    const likes = post.likesCount + (isLiked ? 1 : 0);

    const handleLike = () => {
      setIsLiked((prev) => !prev)
    };

    const handleComment = () => {
      router.push ({pathname: '/comments/[id]', params: { id: post.id }});
    }

    const handleSaved = () => {
      setIsSaved((prev) => !prev);
    }

    return (
      <View style = {styles.row}>
        <View style = {styles.left}>
          <Pressable style={styles.action} onPress={handleLike}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={ICON_SIZE}
            color={isLiked ? Colors.dark.notification : Colors.dark.text}
          />
          <Text style={styles.count}>{formatWithCommas(likes)}</Text>
        </Pressable>

        <Pressable
          style={styles.action}
          onPress={handleComment}>
          <Ionicons name="chatbubble-outline" size={ICON_SIZE - 2} color={Colors.dark.text} />
          <Text style={styles.count}>{formatWithCommas(post.commentsCount)}</Text>
        </Pressable>

        <View style={styles.action}>
          <Ionicons name="repeat-outline" size={ICON_SIZE} color={Colors.dark.text} />
          <Text style={styles.count}>{formatWithCommas(post.repostsCount)}</Text>
        </View>

        <View style={styles.action}>
          <Ionicons name="paper-plane-outline" size={ICON_SIZE - 2} color={Colors.dark.text} />
          <Text style={styles.count}>{formatWithCommas(post.sharesCount)}</Text>
        </View>
        </View>

        <Pressable onPress={handleSaved}>
        <Ionicons name={isSaved ? 'bookmark' : 'bookmark-outline'} size={ICON_SIZE} color={Colors.dark.text} />
        </Pressable>
        
      </View>
    )
}

export default PostActions

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
  },
  left: { flexDirection: 'row', alignItems: 'center', gap: Spacing.lg },
  action: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs + 2 },
  count: { color: Colors.dark.text, fontSize: FontSize.body, fontWeight: '600' },
});

