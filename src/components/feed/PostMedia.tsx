'use-client'

import { Image } from 'expo-image';
import { useState } from 'react';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
  type NativeScrollEvent,
  type NativeSyntheticEvent,
} from 'react-native';

import { Colors, FontSize, Spacing } from '@/constants/theme';

type PostMediaProps = {
  imageUrls: string[];
};

const PostMedia = ({imageUrls} : PostMediaProps) => {
    const { width } = useWindowDimensions(); // full screen width, updates on rotation
  const height = (width * 5) / 4; // Instagram 4:5 portrait
  const [activeIndex, setActiveIndex] = useState(0);
  const isCarousel = imageUrls.length > 1;

  const handleScroll = (event : NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    if (index !== activeIndex) {
      setActiveIndex(index);
    }
  };

  return (
    <View>
      <FlatList
        horizontal
        pagingEnabled // snap one full image at a time
        data={imageUrls}
        keyExtractor={(url) => url}
        showsHorizontalScrollIndicator={false}
        onScroll={handleScroll}
        scrollEventThrottle={16} // ~60 updates/sec
        scrollEnabled={isCarousel}
        renderItem={({ item }) => (
          <Image source={{ uri: item }} style={[styles.image, { width, height }]} contentFit="cover" transition={200} />
        )}
      />

       {isCarousel && (
        <View style={styles.counter}>
          <Text style={styles.counterText}>
            {activeIndex + 1}/{imageUrls.length}
          </Text>
        </View>
      )}

       {isCarousel && (
        <View style={styles.dots}>
          {imageUrls.map((url, index) => (
            <View key={url} style={[styles.dot, index === activeIndex && styles.dotActive]} />
          ))}
        </View>
      )}
    </View>
  );
}

export default PostMedia;

const styles = StyleSheet.create({
  image: { backgroundColor: Colors.dark.surface }, // grey while loading
  counter: {
    position: 'absolute',
    top: Spacing.md,
    right: Spacing.md,
    backgroundColor: 'rgba(0,0,0,0.6)',
    borderRadius: 14,
    paddingHorizontal: Spacing.sm + 2,
    paddingVertical: Spacing.xs,
  },
  counterText: { color: Colors.dark.text, fontSize: FontSize.small },
  dots: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: Spacing.xs,
    paddingTop: Spacing.md,
  },
  dot: { width: 6, height: 6, borderRadius: 3, backgroundColor: Colors.dark.dotInactive },
  dotActive: { backgroundColor: Colors.dark.dotActive },
});