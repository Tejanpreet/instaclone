import {Link} from "expo-router";
import {Text, View} from "react-native";

import {placeholderLinkStyle, PlaceholderScreen} from "@/components/dev/placeholder-screen";

const HomeScreen = () => {
  return (
    <PlaceholderScreen title = "Home">
      <Link href = {{pathname : '../post/[id]' ,  params :{id : 'p1'} }}>
        <Text style = {placeholderLinkStyle}>Go to Post p1</Text>      
      </Link>

      <Link href = {{pathname : '../user/[username]' ,  params :{username : 'u1'} }}>
        <Text style={placeholderLinkStyle}>Open @nova.creates →</Text>
      </Link>

      <Link href = {{pathname : '../comments/[id]' , params : {id : 'p1'}}}>
        <Text style = {placeholderLinkStyle}>Open comments sheet </Text>
      </Link>
    </PlaceholderScreen>
  );
};

export default HomeScreen;