import {useLocalSearchParams} from 'expo-router';
import {Text} from 'react-native';

import {PlaceholderScreen , placeholderLinkStyle} from '@/components/dev/placeholder-screen';

const CommentsSheet = () => {
  const {id} = useLocalSearchParams<{id : string}>();
  return (
    <PlaceholderScreen title = "Comments">
      <Text style = {placeholderLinkStyle}> for Post : {id}</Text>
    </PlaceholderScreen>
  );
};

export default CommentsSheet;