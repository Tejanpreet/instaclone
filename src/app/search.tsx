import {router} from 'expo-router';
import {Pressable , Text} from 'react-native';

import {PlaceholderScreen , placeholderLinkStyle} from '@/components/dev/PlaceholderScreen';

const SearchScreen = () => {
  return (
    <PlaceholderScreen title = "Search (Recent)">
      {/* Header is hidden here, so we go back with code instead of a header button */}
      <Pressable onPress = {() => router.back()}>
        <Text style = {placeholderLinkStyle}> Back </Text>
        </Pressable> 
    </PlaceholderScreen>
  );
};

export default SearchScreen;

