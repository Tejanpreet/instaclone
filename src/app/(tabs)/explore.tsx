'use-client'

import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import  GridTile  from '@/components/grid/GridTile';
import { GridColumns, GridGap, useGridTileWidth } from '@/components/grid/UseGridTileWidth';
import  Chip  from '@/components/search/chip';
import { Colors, FontSize, Spacing } from '@/constants/theme';
import { getExplorePosts } from '@/data/posts';
import { CurrentUserID } from '@/data/users';

const topics =  ['For you', 'Photography', 'Food', 'Travel', 'Dance'];

const explorePosts = getExplorePosts(CurrentUserID);

const ExploreScreen = () => {
  const insets = useSafeAreaInsets();
  const tileWidth = useGridTileWidth();
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);

  const openSearch = () => {
    router.push('/search');
  }

   return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Looks like an input, but is a button: tapping it opens the Search screen */}
      <View style={styles.searchRow}>
        <Pressable style={styles.searchBar} onPress={() => router.push('/search')}>
          <Ionicons name="search-outline" size={20} color={Colors.dark.textMuted} />
          <Text style={styles.searchPlaceholder}>Search</Text>
        </Pressable>
        <Ionicons name="bookmark-outline" size={26} color={Colors.dark.text} />
      </View>

      <FlatList
        data={explorePosts}
        keyExtractor={(post) => post.id}
        numColumns={GridColumns}
        columnWrapperStyle={styles.gridRow}
        ItemSeparatorComponent={() => <View style={styles.gridRowGap} />}
        renderItem={({ item }) => <GridTile post={item} width={tileWidth} showViews />}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.chips}>
            <Chip icon={<Ionicons name="options-outline" size={20} color={Colors.dark.text} />} />
            {topics.map((topic) => (
              <Chip
                key={topic}
                label={topic}
                selected={topic === selectedTopic}
                onPress={() => setSelectedTopic(topic)}
              />
            ))}
          </ScrollView>
        }
      />
      
      </View>

      );
};

export default ExploreScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background },
  searchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.lg,
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    height: 44,
    borderRadius: 22,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.dark.input,
  },
  searchPlaceholder: { color: Colors.dark.textMuted, fontSize: FontSize.body + 1 },
  chips: { gap: Spacing.sm, paddingHorizontal: Spacing.lg, paddingVertical: Spacing.sm },
  gridRow: { gap: GridGap },
  gridRowGap: { height: GridGap },
});
