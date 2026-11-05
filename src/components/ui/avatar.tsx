import { Image } from 'expo-image';
import { LinearGradient } from 'expo-linear-gradient';
import { StyleSheet, View } from 'react-native';

import { Colors, StoryGradient } from '@/constants/theme';

type AvatarProps = {
  uri: string;
  size: number; // total outer size, ring included
  ring?: 'none' | 'story' | 'seen';
};


const Avatar = ({uri , size , ring = 'none' } : AvatarProps) => {

  // small helper function
  const circle = (size : number) => {
    return {width :  size , height: size , borderRadius:  size / 2};
  }

  const loadingBackground = {backgroundColor : Colors.dark.surface};

  const ringWidth = Math.max(2 , Math.round (size * 0.036));

  const innerSize = size - ringWidth *4;

const photo = (
    <View style={[styles.gap, circle(size - ringWidth * 2), { padding: ringWidth }]}>
      <Image source={{ uri }} style={[circle(innerSize), loadingBackground]} contentFit="cover" transition={150} />
    </View>
  );

if (ring === 'none'){
    return  <Image source={{ uri }} style={[circle(size), loadingBackground]} contentFit="cover" transition={150} />;
  }

if (ring === 'seen'){
  return (
    <View>
      {photo}
    </View>
  );
}

return (
  <LinearGradient
   colors={StoryGradient}
      start={{ x: 0, y: 1 }} // bottom-left
      end={{ x: 1, y: 0 }} // top-right
      style={[circle(size), styles.center]}>

  {photo}
  </LinearGradient>

)
 
}

export default Avatar;

const styles = StyleSheet.create({
  center: { alignItems: 'center', justifyContent: 'center' },
  gap: { backgroundColor: Colors.dark.background },
});