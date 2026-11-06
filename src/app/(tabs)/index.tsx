import { FlatList, StyleSheet, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import PostCard  from '@/components/feed/PostCard';
import StoriesBar  from '@/components/feed/StoriesBar';
import HomeHeader  from '@/components/home/HomeHeader';
import  {Colors}  from '@/constants/theme';
import { posts } from '@/data/posts';

const HomeScreen = () => {
  const insets = useSafeAreaInsets(); 

  return (
  <View style={[styles.container, { paddingTop: insets.top }]}>
      <FlatList
        data={posts}
        keyExtractor={(post) => post.id}
        renderItem={({ item }) => <PostCard post={item} />}
        showsVerticalScrollIndicator={false}
        // Header + stories scroll away with the feed 
        ListHeaderComponent={
          <>
            <HomeHeader />
            <StoriesBar />
          </>
        }
      />
    </View>
  );
};

export default HomeScreen;


const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background },
});