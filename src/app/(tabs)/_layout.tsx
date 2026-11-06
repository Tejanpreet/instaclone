import {Ionicons , MaterialCommunityIcons}  from "@expo/vector-icons"; 
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import Avatar  from '@/components/ui/avatar';
import { CurrentUserID, getUserById } from '@/data/users';

import TabIcon from '@/components/navigation/TabIcon';
import { Colors } from '@/constants/theme';

const colors = Colors.dark;
const iconSize = 28;
const currentUser = getUserById(CurrentUserID);

const TabLayout = () => {
  return (
    <Tabs
      screenOptions = {{
         headerShown: false, // each screen draws its own Instagram-style header
         tabBarShowLabel : false, // Instagram's tab has icons only
         tabBarActiveTintColor : colors.text,
         tabBarInactiveTintColor : colors.text,
         tabBarStyle : {
          backgroundColor : colors.background ,
          borderTopWidth : 0,
         },
      }}>

        <Tabs.Screen
          name = "index"
          options = {{
            tabBarIcon : ({focused}) => (
              <Ionicons name = {focused ? 'home' : 'home-outline'} size = {iconSize} color = {colors.text}
              />),
          }}
          />

        <Tabs.Screen
          name = "reels"
          options = {{
            tabBarIcon : ({focused}) => (
              <MaterialCommunityIcons name = {focused ? 'play-box' : 'play-box-outline'} size= {iconSize} color = {colors.text} />
            ),
          }}
          />
        
        <Tabs.Screen 
          name = "messages"
          options = {{
            tabBarIcon : ({focused}) => (
              <TabIcon showDot>
                <Ionicons
                  name = {focused ? 'paper-plane' : 'paper-plane-outline'}
                  size = {iconSize - 2 }
                  color = {colors.text}/>
              </TabIcon>
            ),
          }}
        />

        <Tabs.Screen
          name = "explore"
          options = {{
            tabBarIcon : ({focused}) => (
              <Ionicons name = {focused ? 'search' : 'search-outline'} size = {iconSize} color = {colors.text}/>
            )
          }}
        />

        <Tabs.Screen
          name = "profile"
          options = {{
            tabBarIcon : ({focused})=> (
              <TabIcon showDot>
                  <View style={[styles.avatarFrame, focused && styles.avatarFocused]}>
                  {currentUser && <Avatar uri={currentUser.avatarUrl} size={iconSize - 2} />}
                  </View>
              </TabIcon>
            )
          }}/>
    </Tabs>
  );
}

export default TabLayout;

const styles = StyleSheet.create({
  // A transparent 1.5px border is always there, so the size never changes when focused
  avatarFrame: {
    borderRadius: iconSize,
    borderWidth: 1.5,
    borderColor: 'transparent',
  },
  avatarFocused: {
    borderColor: colors.text,
  },
});