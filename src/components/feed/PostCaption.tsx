'use-client'

import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';

import { Colors, FontSize, Spacing } from '@/constants/theme';
import { formatTimeAgo } from '@/utils/format';

// About how many characters fit on one line at our font size.
const lineLength = 46;
const moreLabel = '… more';

type PostCaptionProps = {
  username: string;
  caption: string;
  hoursAgo: number;
};

const PostCaption = ({username, caption, hoursAgo}:PostCaptionProps) => {
    const [isExpanded, setIsExpanded] = useState(false);

    // The username shares the first line , so the preview gets what is left.
    const previewLength = lineLength - username.length - moreLabel.length;
    const isLong = caption.length > previewLength;
    const visibleText = isLong && !isExpanded ? caption.slice(0, previewLength).trimEnd() : caption;

    // function handling the state 
    const handleExpansion = () => {
      setIsExpanded(true);
    }

     return (
    <View style={styles.container}>
      <Text style={styles.caption}>
        <Text style={styles.username}>{username} </Text>
        {visibleText}
        {isLong && !isExpanded && (
          <Text style={styles.muted} onPress={handleExpansion}>
            {moreLabel}
          </Text>
        )}
      </Text>

      <Text style={styles.meta}>
        {formatTimeAgo(hoursAgo)} · <Text style={styles.metaBold}>See Translation</Text>
      </Text>
    </View>
  );
}

export default PostCaption;

const styles = StyleSheet.create({
  container: { paddingHorizontal: Spacing.md, gap: Spacing.xs, paddingBottom: Spacing.lg },
  caption: { color: Colors.dark.text, fontSize: FontSize.body, lineHeight: 20 },
  username: { fontWeight: '600' },
  muted: { color: Colors.dark.textMuted },
  meta: { color: Colors.dark.textMuted, fontSize: FontSize.small },
  metaBold: { color: Colors.dark.text, fontWeight: '600' },
});