'use-client'

import { useState } from 'react';
import { FlatList, StyleSheet, Text, View } from 'react-native';

import GridTile  from '@/components/grid/GridTile';
import { GridColumns, GridGap, useGridTileWidth } from '@/components/grid/UseGridTileWidth';
import  ProfileHeader from '@/components/profile/ProfileHeader';
import  type {ProfileTab } from '@/components/profile/ProfileHeader';
import { Colors, Spacing } from '@/constants/theme';
import { getPostsByUser } from '@/data/posts';
import type { User } from '@/types/models';

type ProfileViewProps = {
  user: User;
  isOwnProfile: boolean;
};

const ProfileView = ({ user, isOwnProfile }: ProfileViewProps) => {
  const tileWidth = useGridTileWidth();
  const [activeTab, setActiveTab] = useState<ProfileTab>('grid');
  const [isFollowing, setIsFollowing] = useState(user.isFollowing);

  const userPosts = getPostsByUser(user.id);

  // only the grid tab has content in this mock ; the others show an empty state

  const visiblePosts = activeTab === 'grid' ? userPosts : [];

  const handleFollowing = () => {
    setIsFollowing((prev) => !prev);
  }

  return (
    <FlatList
      data={visiblePosts}
      keyExtractor={(post) => post.id}
      numColumns={GridColumns}
      columnWrapperStyle={styles.gridRow}
      ItemSeparatorComponent={() => <View style={styles.gridRowGap} />}
      renderItem={({ item }) => <GridTile post={item} width={tileWidth} showPinned />}
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={
        <ProfileHeader
          user={user}
          postsCount={Math.max(user.postsCount, userPosts.length)}
          isOwnProfile={isOwnProfile}
          isFollowing={isFollowing}
          onToggleFollow={handleFollowing}
          activeTab={activeTab}
          onChangeTab={setActiveTab}
        />
      }
      ListEmptyComponent={<Text style={styles.empty}>Nothing to see here yet.</Text>}
    />
  );

}

export default ProfileView; 

const styles = StyleSheet.create({
  gridRow: { gap: GridGap },
  gridRowGap: { height: GridGap },
  empty: { color: Colors.dark.textMuted, textAlign: 'center', padding: Spacing.xl },
});