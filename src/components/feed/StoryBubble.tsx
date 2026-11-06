import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, View } from 'react-native';

import  Avatar  from '@/components/ui/avatar';
import { Colors, FontSize, Spacing } from '@/constants/theme';

const BUBBLE_SIZE = 88;

type StoryBubbleProps = {
  avatarUrl: string;
  label: string;
  isOwnStory?: boolean;
};

const StoryBubble = ({ avatarUrl, label, isOwnStory = false} : StoryBubbleProps) => {

    return (
    <View style={styles.container}>
      <View>
        <Avatar uri={avatarUrl} size={BUBBLE_SIZE} ring={isOwnStory ? 'seen' : 'story'} />
        {isOwnStory && (
          <View style={styles.addBadge}>
            <Ionicons name="add" size={18} color={Colors.dark.background} />
          </View>
        )}
      </View>
      <Text style={[styles.label, isOwnStory && styles.ownLabel]} numberOfLines={1}>
        {label}
      </Text>
    </View>
  );

}

export default StoryBubble;

const styles = StyleSheet.create({
  container: {
    width: BUBBLE_SIZE,
    alignItems: 'center',
    gap: Spacing.xs,
  },
  addBadge: {
    position: 'absolute',
    right: 0,
    bottom: 0,
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: Colors.dark.text,
    borderWidth: 3,
    borderColor: Colors.dark.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    color: Colors.dark.text,
    fontSize: FontSize.small,
  },
  ownLabel: {
    color: Colors.dark.textMuted,
  },
});