import { Stack, useLocalSearchParams } from 'expo-router';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import PostCard  from '@/components/feed/PostCard';
import { Colors, FontSize } from '@/constants/theme';
import { getPostById, posts } from '@/data/posts';
import { getUserById } from '@/data/users';

const PostDetailScreen = () => {
  const {id} = useLocalSearchParams<{id : string}>();
  const post = getPostById(id);
  const author = post ? getUserById(post.authorId) : undefined;

  // gaurd clause 

  if (!post || !author) {
    return (
      <View style={styles.center}>
        <Text style={styles.subtitle}>Post not found</Text>
      </View>
    );
  }

  //the tapped post first, then the author's other posts below.
  const authorPosts = [post, ...posts.filter((p) => p.authorId === author.id && p.id !== post.id)];

  return (
    <>
      <Stack.Screen
        options={{
          headerTitle: () => (
            <View style={styles.titleBlock}>
              <Text style={styles.title}>Posts</Text>
              <Text style={styles.subtitle}>{author.username}</Text>
            </View>
          ),
        }}
      />
      <FlatList
        data={authorPosts}
        keyExtractor={(p) => p.id}
        renderItem={({ item }) => <PostCard post={item} showFollow={false} />}
        showsVerticalScrollIndicator={false}
      />
    </>
  );
};

export default PostDetailScreen;

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  titleBlock: { alignItems: 'center' },
  title: { color: Colors.dark.text, fontSize: 17, fontWeight: '700' },
  subtitle: { color: Colors.dark.textMuted, fontSize: FontSize.small },
});