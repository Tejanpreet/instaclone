import { Ionicons } from '@expo/vector-icons';
import { Image } from 'expo-image';
import { router } from 'expo-router';
import { Pressable, StyleSheet, Text, View } from 'react-native';

import { Colors, FontSize, Spacing } from '@/constants/theme';
import type { post } from '@/types/models';
import { formatCompact } from '@/utils/format';

type GridTileProps = {
  post: post;
  width: number; // the parent works out the column width
  showViews?: boolean; // Explore shows view counts
  showPinned?: boolean; // Profile shows a pin on pinned posts
};

// Instagram grids use almost 3:4 portrait tiles

const GridTile = ({ post, width, showViews = false, showPinned = false }: GridTileProps) => {
  const openPost = () => {
    return router.push({ pathname: '/post/[id]', params: { id: post.id } });
  }

  return (
    <Pressable onPress={openPost}>
      <Image
        source={{ uri: post.imageUrls[0] }}
        style={[styles.image, { width, height: (width * 4) / 3 }]}
        contentFit="cover"
        transition={150}
      />

      {showPinned && post.isPinned && (
        <Ionicons name="pin" size={18} color={Colors.dark.text} style={styles.pin} />
      )}

      {post.imageUrls.length > 1 && !showPinned && (
        <Ionicons name="copy" size={16} color={Colors.dark.text} style={styles.pin} />
      )}

      {showViews && post.viewsCount !== undefined && (
        <View style={styles.views}>
          <Ionicons name="eye-outline" size={16} color={Colors.dark.text} />
          <Text style={styles.viewsText}>{formatCompact(post.viewsCount)}</Text>
        </View>
      )}
    </Pressable>
  );
}

export default GridTile;

const styles = StyleSheet.create({
  image: { backgroundColor: Colors.dark.surface },
  pin: { position: 'absolute', top: Spacing.sm, right: Spacing.sm },
  views: {
    position: 'absolute',
    left: Spacing.sm,
    bottom: Spacing.sm,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
  },
  viewsText: {
    color: Colors.dark.text,
    fontSize: FontSize.body,
    fontWeight: '600',
    // A soft shadow keeps white text readable on bright photos.
    textShadowColor: 'rgba(0,0,0,0.6)',
    textShadowRadius: 4,
  },
});