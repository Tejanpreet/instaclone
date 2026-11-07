'use-client'

import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import  Avatar  from '@/components/ui/avatar';
import { Colors, FontSize, Spacing } from '@/constants/theme';
import type { post, User } from '@/types/models';
import { formatCompact } from '@/utils/format';

type ReelItemProps = {
  post: post;
  author: User;
  height: number; // each reel fills exactly one page
};

const ReelItem = ({ post, author, height }: ReelItemProps) => {

  const [isLiked , setIsLiked] =  useState(false);
  const likes = post.likesCount + (isLiked ? 1 : 0);

  const handleLiked = () => {
    setIsLiked((prev) => !prev);
  }

  return (
    <View style = {{height}}>
      <Image source={{ uri: post.imageUrls[0] }} style={StyleSheet.absoluteFill} contentFit="cover" /> 

      {/* right hand action column */}
      <View style={styles.actions}>
        <Pressable style={styles.action} onPress={handleLiked}>
          <Ionicons
            name={isLiked ? 'heart' : 'heart-outline'}
            size={30}
            color={isLiked ? Colors.dark.notification : Colors.dark.text}
          />
          <Text style={styles.actionText}>{formatCompact(likes)}</Text>
        </Pressable>
        <View style={styles.action}>
          <Ionicons name="chatbubble-outline" size={28} color={Colors.dark.text} />
          <Text style={styles.actionText}>{formatCompact(post.commentsCount)}</Text>
        </View>
        <View style={styles.action}>
          <Ionicons name="repeat-outline" size={30} color={Colors.dark.text} />
          <Text style={styles.actionText}>{formatCompact(post.repostsCount)}</Text>
        </View>
        <View style={styles.action}>
          <Ionicons name="paper-plane-outline" size={28} color={Colors.dark.text} />
          <Text style={styles.actionText}>{formatCompact(post.sharesCount)}</Text>
        </View>
        <Ionicons name="ellipsis-horizontal" size={26} color={Colors.dark.text} />
      </View>

      {/* Bottom-left author + caption */}
      <View style={styles.info}>
        <View style={styles.authorRow}>
          <Avatar uri={author.avatarUrl} size={34} />
          <Text style={styles.username}>{author.username}</Text>
          {!author.isFollowing && (
            <View style={styles.follow}>
              <Text style={styles.followText}>Follow</Text>
            </View>
          )}
        </View>
        <Text style={styles.caption} numberOfLines={1}>
          {post.caption}
        </Text>
        <View style={styles.audioRow}>
          <Ionicons name="musical-notes" size={14} color={Colors.dark.text} />
          <Text style={styles.audio}>{author.username} · Original audio</Text>
        </View>
      </View>
    </View>
  );
};

export default ReelItem;

// Text shadow so white text stays readable on any photo.
const shadow = { textShadowColor: 'rgba(0,0,0,0.7)', textShadowRadius: 4 };

const styles = StyleSheet.create({
  actions: {
    position: 'absolute',
    right: Spacing.md,
    bottom: Spacing.xl,
    alignItems: 'center',
    gap: Spacing.lg,
  },
  action: { alignItems: 'center', gap: 2 },
  actionText: { color: Colors.dark.text, fontSize: FontSize.small, fontWeight: '600', ...shadow },
  info: { position: 'absolute', left: Spacing.lg, right: 80, bottom: Spacing.xl, gap: Spacing.sm },
  authorRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.sm },
  username: { color: Colors.dark.text, fontSize: FontSize.body, fontWeight: '600', ...shadow },
  follow: {
    borderWidth: 1,
    borderColor: Colors.dark.text,
    borderRadius: 8,
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
  },
  followText: { color: Colors.dark.text, fontSize: FontSize.small, fontWeight: '600' },
  caption: { color: Colors.dark.text, fontSize: FontSize.body, ...shadow },
  audioRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.xs },
  audio: { color: Colors.dark.text, fontSize: FontSize.small, ...shadow },
});