import { FlatList, StyleSheet } from 'react-native';

import  StoryBubble  from '@/components/feed/story-bubble';
import { Spacing } from '@/constants/theme';
import { CURRENT_USER_ID, getUserById, users } from '@/data/users';

const currentUser = getUserById(CURRENT_USER_ID);
const storyUsers = users.filter((user) => user.hasActiveStory);

const StoriesBar = () => {
  return (
    <FlatList
      horizontal
      data = {storyUsers
      }
      keyExtractor={(user) => user.id}
      showsHorizontalScrollIndicator = {false}
      ListHeaderComponent={
        currentUser ? <StoryBubble avatarUrl = {currentUser.avatarUrl} label = "You Story" isOwnStory/> : undefined
      }
      renderItem = {({item}) => <StoryBubble avatarUrl = {item.avatarUrl} label = {item.username} /> }
      />
  );
}

export default StoriesBar;

const styles = StyleSheet.create({
  content: {
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    gap: Spacing.lg,
  },
});