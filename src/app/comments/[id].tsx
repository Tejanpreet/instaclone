'use-client'

import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams } from 'expo-router';
import { useState } from 'react';
import { FlatList, KeyboardAvoidingView, Platform, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CommentInput  from '@/components/comments/CommentInput';
import CommentRow  from '@/components/comments/CommentRow';
import { Colors, Spacing } from '@/constants/theme';
import { getCommentsForPost } from '@/data/comments';
import { CurrentUserID, getUserById } from '@/data/users';
import type { Comment } from '@/types/models';

const CommentSheets = () => {
  const {id} = useLocalSearchParams<{id : string}>();
  const insets = useSafeAreaInsets();
  const currentUser = getUserById(CurrentUserID);

  // starting with the mock comments ; new ones get added to this state.
  const [items, setItems] = useState<Comment[]>(() => getCommentsForPost(id));

  const HandleAddComment = (text:string) => {
    const newComment: Comment = {
      id: `local-${Date.now()}`,
      postId: id,
      userId: CurrentUserID,
      text,
      likesCount: 0,
      hoursAgo: 0,
    };

    setItems((prev) => [...prev , newComment]);
  }


  return (
       <KeyboardAvoidingView
             style={styles.container}
             behavior={Platform.OS === 'ios' ? 'padding' : undefined}>

      <View style={styles.header}>
        <Text style={styles.title}>Comments</Text>
        <Ionicons name="paper-plane-outline" size={24} color={Colors.dark.text} style={styles.share} />
      </View>

      <FlatList
        data={items}
        keyExtractor={(comment) => comment.id}
        renderItem={({ item }) => {
          const author = getUserById(item.userId);
          return author ? <CommentRow comment={item} author={author} /> : null;
        }}
        ListEmptyComponent={<Text style={styles.empty}>No comments yet. Start the conversation.</Text>}
        contentContainerStyle={styles.list}
      />

      {currentUser && (
        <View style={{ paddingBottom: insets.bottom + Spacing.sm }}>
          <CommentInput avatarUrl={currentUser.avatarUrl} onSubmit={HandleAddComment} />
        </View>
      )}
    </KeyboardAvoidingView>
  );

}

export default CommentSheets;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.sheet },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Spacing.xl,
    paddingBottom: Spacing.md,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.dark.surface,
  },
  title: { color: Colors.dark.text, fontSize: 17, fontWeight: '700' },
  share: { position: 'absolute', right: Spacing.lg, top: Spacing.xl },
  list: { paddingVertical: Spacing.sm },
  empty: { color: Colors.dark.textMuted, textAlign: 'center', padding: Spacing.xl },
});
