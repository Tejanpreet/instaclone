import {Link} from "expo-router";
import {Text} from "react-native";

import {placeholderLinkStyle, PlaceholderScreen} from "@/components/dev/PlaceholderScreen";

const ExploreScreen = () => {
  return (
    <PlaceholderScreen title = "Explore">
      <Link href = "../search">
        <Text style = {placeholderLinkStyle}>Tap search bar </Text>
        </Link>
    </PlaceholderScreen>
  );
};

export default ExploreScreen;