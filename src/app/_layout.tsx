import { GrandHotel_400Regular, useFonts } from '@expo-google-fonts/grand-hotel';
import { DarkTheme , Stack , ThemeProvider } from "expo-router";
import {StatusBar} from "expo-status-bar";

import {Colors} from "../constants/theme";

const colors = Colors.dark;

// Tell the navigation library to use OUR colours, so screen transitions
// never flash white between screens.
const navigationTheme = {
 ...DarkTheme,
 colors:{
  ...DarkTheme.colors,
  background: colors.background,
  card: colors.background,
  text: colors.text,
  border: colors.surface,
  primary: colors.text,
  notification: colors.notification,
 },
};

const RootLayout = () => {

  // Load the required logo font before showing anything , so the text never jumps the fonts 
  const [fontsLoaded] = useFonts({GrandHotel_400Regular});

  // gaurd clause if it returns false
  if (!fontsLoaded){
    return null;
  }
  
  return (
    <ThemeProvider value={navigationTheme}>
      <StatusBar style="light" />
      <Stack screenOptions={{
        headerStyle : {backgroundColor : colors.background},
        headerTintColor : colors.text,
        headerShadowVisible : false,
        headerBackButtonDisplayMode : 'minimal',
        contentStyle : {backgroundColor : colors.background},
      }}>

      {/* The whole tab navigator is ONE screen of the root stack */}
      <Stack.Screen name = "(tabs)" options = {{headerShown : false }} />

      {/*Screens pushed ON top of the tabs (tab bar is hidden) */}

      <Stack.Screen name = "post/[id]" options = {{title : 'Posts' , headerTitleAlign: 'center'}} />
      <Stack.Screen name = "user/[username]" /> 
      <Stack.Screen name="search" options={{ headerShown: false }} />

      {/* Comments slides up as a bottom sheet, like Instagram */}

      <Stack.Screen 
        name = "comments/[id]"
        options = {{
          presentation : 'formSheet',
          sheetAllowedDetents : [0.7 , 1],
          sheetGrabberVisible : true,
          sheetCornerRadius : 24,
          headerShown : false ,
          contentStyle : {backgroundColor : colors.sheet},
        }}
      />
      </Stack>
    </ThemeProvider>
  )
}

export default RootLayout;