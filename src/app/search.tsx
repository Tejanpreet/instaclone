'use-client'
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import UserRow from '@/components/search/UserRow';
import { Colors, FontSize, Spacing } from '@/constants/theme';
import { CurrentUserID, users } from '@/data/users';

const otherUsers = users.filter((user) => user.id !== CurrentUserID);

const SearchScreen = () => {
  const insets = useSafeAreaInsets();
  const [query, setQuery] = useState('');
  const [recentIds, setRecentIds] = useState(otherUsers.map((user) => user.id));

  // Derived data: recalculated on every render from state, never stored separately.
  const searchTerm = query.trim().toLowerCase();
  const isSearching = searchTerm.length > 0;

  const results = isSearching
                  ? otherUsers.filter(
                               (user) =>
                               user.username.toLowerCase().includes(searchTerm) ||
                               user.fullName.toLowerCase().includes(searchTerm),
                               )
                               : otherUsers.filter((user) => recentIds.includes(user.id));

  const removeRecent = (id : string) => {
    setRecentIds((prev) => prev.filter((recentId) => recentId !== id)); 
  }

  const GoBack = () => {
    return router.back;
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.header}>
        <Pressable onPress={GoBack} hitSlop={12}>
          <Ionicons name="chevron-back" size={28} color={Colors.dark.text} />
        </Pressable>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={Colors.dark.textMuted} />
          <TextInput
            value={query}
            onChangeText={setQuery}
            placeholder="Search"
            placeholderTextColor={Colors.dark.textMuted}
            style={styles.input}
            autoFocus // open the keyboard straight away, like Instagram
            autoCapitalize="none"
            autoCorrect={false}
           
          />
        </View>
      </View>

      <FlatList
        data={results}
        keyExtractor={(user) => user.id}
        keyboardShouldPersistTaps="handled" // taps work while the keyboard is open
        renderItem={({ item }) => (
          <UserRow user={item} onRemove={isSearching ? undefined : () => removeRecent(item.id)} />
        )}
        ListHeaderComponent={
          isSearching ? undefined : (
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Recent</Text>
              <Text style={styles.seeAll}>See all</Text>
            </View>
          )
        }
        ListEmptyComponent={
          <Text style={styles.empty}>{isSearching ? 'No results found.' : 'No recent searches.'}</Text>
        }
      />
    </View>

  );
 };

 export default SearchScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: Colors.dark.background },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.md,
    paddingHorizontal: Spacing.md,
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
  input: { flex: 1, color: Colors.dark.text, fontSize: FontSize.body + 1 },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    paddingVertical: Spacing.md,
  },

  sectionTitle: { color: Colors.dark.text, fontSize: 17, fontWeight: '700' },
  seeAll: { color: Colors.dark.accent, fontSize: FontSize.body, fontWeight: '600' },
  empty: { color: Colors.dark.textMuted, textAlign: 'center', padding: Spacing.xl },
});