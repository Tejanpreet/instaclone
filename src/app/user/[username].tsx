import {Stack , useLocalSearchParams} from "expo-router";
import {Text} from "react-native";

import {PlaceholderScreen , placeholderLinkStyle} from "@/components/dev/placeholder-screen";

const UserProfileScreen = () => {
  const {username} = useLocalSearchParams<{username : string}>();

  return (
    <PlaceholderScreen title = "user Profile">
      {/*  Set the header title from the param  */}
      <Stack.Screen options = {{title : username}}/>
      <Text style = {placeholderLinkStyle}>Received Username: {username}</Text>
    </PlaceholderScreen>
  );
}

export default UserProfileScreen;