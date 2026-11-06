'use-client'
import { useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';

import  Avatar  from '@/components/ui/avatar';
import { Colors, FontSize, Spacing } from '@/constants/theme';

const QuickEmojis = ['❤️', '🙌', '🔥', '👏', '😢', '😍', '😮', '😂'];
 
type CommentInputProps = {
  avatarUrl: string;
  onSubmit: (text: string) => void; // the PARENT decides what "posting" means
};

const CommentInput = ({ avatarUrl, onSubmit }: CommentInputProps) => {

  const [text , setText] = useState('');

  const handleSubmit = () => {
    const trimmed = text.trim();
    if (!trimmed){
      return ; // to ignore comments
    }

    onSubmit(trimmed);
    setText('');
  }

  return (
  <View style={styles.container}>
    <View style={styles.emojiRow}>
        {QuickEmojis.map((emoji) => (
          <Pressable key={emoji} onPress={() => setText((prev) => prev + emoji)}>
            <Text style={styles.emoji}>{emoji}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.inputRow}>
        <Avatar uri={avatarUrl} size={40} />
        <View style={styles.inputBox}>
          <TextInput
            value={text}
            onChangeText={setText}
            onSubmitEditing={handleSubmit}
            placeholder="What do you think of this?"
            placeholderTextColor={Colors.dark.textMuted}
            style={styles.input}
            returnKeyType="send"
          />
          {text.trim() ? (
            <Pressable onPress={handleSubmit}>
              <Text style={styles.post}>Post</Text>
            </Pressable>
          ) : (
            <Text style={styles.gif}>GIF</Text>
          )}
        </View>
      </View>
    </View>
  );

};

export default CommentInput;

const styles = StyleSheet.create({
  container: {
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: Colors.dark.surface,
    paddingHorizontal: Spacing.lg,
    paddingTop: Spacing.md,
    gap: Spacing.md,
  },
  emojiRow: { flexDirection: 'row', justifyContent: 'space-between' },
  emoji: { fontSize: 26 },
  inputRow: { flexDirection: 'row', alignItems: 'center', gap: Spacing.md },
  inputBox: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.dark.surface,
    borderRadius: 24,
    paddingHorizontal: Spacing.lg,
    minHeight: 44,
  },
  input: { flex: 1, color: Colors.dark.text, fontSize: FontSize.body, paddingVertical: Spacing.sm },
  gif: {
    color: Colors.dark.text,
    fontWeight: '700',
    fontSize: 12,
    borderWidth: 1.5,
    borderColor: Colors.dark.text,
    borderRadius: 4,
    paddingHorizontal: 3,
  },
  post: { color: Colors.dark.accent, fontWeight: '600', fontSize: FontSize.body },
});