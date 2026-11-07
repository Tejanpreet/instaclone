import { Ionicons } from '@expo/vector-icons';
import { FlatList, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import  ConversationRow  from '@/components/messages/ConversationRow';
import { Colors, FontSize, Spacing } from '@/constants/theme';
import   {conversations} from '@/data/conversation';
import { CurrentUserID, getUserById } from '@/data/users';

const MessagesScreen = () => {
  const insets = useSafeAreaInsets();
  const currentUser = getUserById(CurrentUserID);

  return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{currentUser?.username}</Text>
        <Ionicons name="create-outline" size={28} color={Colors.dark.text} />
      </View>

      <FlatList
        data={conversations}
        keyExtractor={(conversation) => conversation.id}
        renderItem={({ item }) => {
          const user = getUserById(item.userId);
          return user ? <ConversationRow conversation={item} user={user} /> : null;
        }}
        ListHeaderComponent={
          <>
            <View style={styles.searchBar}>
              <Ionicons name="search-outline" size={20} color={Colors.dark.textMuted} />
              <Text style={styles.searchPlaceholder}>Search</Text>
            </View>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Messages</Text>
              <Text style={styles.requests}>Requests</Text>
            </View>
          </>
        }
      />

      </View>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.sm,
  },
  headerTitle: { color: Colors.dark.text, fontSize: 22, fontWeight: '700' },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    height: 40,
    borderRadius: 20,
    marginHorizontal: Spacing.lg,
    marginVertical: Spacing.sm,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.dark.input,
  },
  searchPlaceholder: { color: Colors.dark.textMuted, fontSize: FontSize.body },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },
  sectionTitle: { color: Colors.dark.text, fontSize: 17, fontWeight: '700' },
  requests: { color: Colors.dark.accent, fontSize: FontSize.body, fontWeight: '600' },
});