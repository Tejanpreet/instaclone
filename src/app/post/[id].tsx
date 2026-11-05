import {useLocalSearchParams} from 'expo-router';
import {Text} from 'react-native';

import {PlaceholderScreen , placeholderLinkStyle} from '@/components/dev/placeholder-screen';

const PostDetailScreen = () => {
  // Read the [id] part of the URL
  const {id} = useLocalSearchParams<{id : string}>();

  return (
    <PlaceholderScreen title = "Post Detail">
      <Text style = {placeholderLinkStyle}>Received ID: {id}</Text>
    </PlaceholderScreen>
  );
};

export default PostDetailScreen;
