'use-client'
import { useState } from 'react';
import { FlatList, StyleSheet, Text, View, type LayoutChangeEvent } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import ReelItem  from '@/components/reels/ReelItem';
import { Colors, Spacing } from '@/constants/theme';
import { getExplorePosts } from '@/data/posts';
import { CurrentUserID, getUserById } from '@/data/users';

const reels = getExplorePosts(CurrentUserID);

const ReelsScreen = () => {
    const insets = useSafeAreaInsets();
    const [pageHeight, setPageHeight] = useState(0);

    const handleLayout = (event : LayoutChangeEvent) => {
        setPageHeight(event.nativeEvent.layout.height);
    };

    return (
      <View style={styles.container} onLayout={handleLayout}>
      {pageHeight > 0 && (
        <FlatList
          data={reels}
          keyExtractor={(post) => post.id}
          pagingEnabled // one reel per swipe, like TikTok/Reels
          showsVerticalScrollIndicator={false}
          renderItem={({ item }) => {
            const author = getUserById(item.authorId);
            return author ? <ReelItem post={item} author={author} height={pageHeight} /> : null;
          }}
        />
      )}
      <Text style={[styles.title, { top: insets.top + Spacing.sm }]}>Reels</Text>
    </View>
    );
};

export default ReelsScreen;


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background },
  title: {
    position: 'absolute',
    left: Spacing.lg,
    color: Colors.dark.text,
    fontSize: 24,
    fontWeight: '700',
    textShadowColor: 'rgba(0,0,0,0.7)',
    textShadowRadius: 4,
  },
});


