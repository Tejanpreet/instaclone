import { FlatList, StyleSheet } from 'react-native';

import  StoryBubble  from '@/components/feed/StoryBubble';
import { Spacing } from '@/constants/theme';
import { CurrentUserID, getUserById, users } from '@/data/users';

const currentUser = getUserById(CurrentUserID);
const storyUsers = users.filter((user) => user.hasActiveStory);

const StoriesBar = () => {
  return (
    <FlatList
      horizontal
      data = {storyUsers
      }
      keyExtractor={(user) => user.id}
      showsHorizontalScrollIndicator = {false}
      contentContainerStyle={styles.content}
      ListHeaderComponent={
        currentUser ? <StoryBubble avatarUrl = {currentUser.avatarUrl} label = "You Story" isOwnStory/> : undefined
      }
      ListHeaderComponentStyle={styles.item}
      renderItem = {({item}) => <StoryBubble avatarUrl = {item.avatarUrl} label = {item.username} /> }
      />
  );
}

export default StoriesBar;

const styles = StyleSheet.create({
  content: {
    paddingLeft: Spacing.md,
    paddingRight: Spacing.xs ,
    paddingVertical: Spacing.sm,
  },
  item: {
    marginRight: Spacing.lg,
  },
});