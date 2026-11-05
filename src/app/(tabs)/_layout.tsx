import {Ionicons , MaterialCommunityIcons}  from "@expo/vector-icons"; 
import { Tabs } from 'expo-router';
import { StyleSheet, View } from 'react-native';

import TabIcon from '@/components/navigation/tab-icon';
import { Colors } from '@/constants/theme';

const colors = Colors.dark;
const ICON_SIZE = 28;

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
              <Ionicons name = {focused ? 'home' : 'home-outline'} size = {ICON_SIZE} color = {colors.text}
              />),
          }}
          />

        <Tabs.Screen
          name = "reels"
          options = {{
            tabBarIcon : ({focused}) => (
              <MaterialCommunityIcons name = {focused ? 'play-box' : 'play-box-outline'} size= {ICON_SIZE} color = {colors.text} />
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
                  size = {ICON_SIZE - 2 }
                  color = {colors.text}/>
              </TabIcon>
            ),
          }}
        />

        <Tabs.Screen
          name = "explore"
          options = {{
            tabBarIcon : ({focused}) => (
              <Ionicons name = {focused ? 'search' : 'search-outline'} size = {ICON_SIZE} color = {colors.text}/>
            )
          }}
        />

        <Tabs.Screen
          name = "profile"
          options = {{
            tabBarIcon : ({focused})=> (
              <TabIcon showDot>
              {/* Temporary: replaced by the real <Avatar /> in Segment 4 */}
              <View style={[styles.avatar, focused && styles.avatarFocused]} />
            </TabIcon>
            )
          }}/>
    </Tabs>
  );
}

export default TabLayout;

const styles = StyleSheet.create({
  avatar: {
    width: ICON_SIZE,
    height: ICON_SIZE,
    borderRadius: ICON_SIZE / 2,
    backgroundColor: colors.surface,
  },
  avatarFocused: {
    borderWidth: 2,
    borderColor: colors.text,
  },
});