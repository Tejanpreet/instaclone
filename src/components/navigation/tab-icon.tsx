import type {ReactNode} from "react";
import {StyleSheet , View} from "react-native";
import {Colors} from "../../constants/theme";

type TabIconProps = {
  children : ReactNode ; // the icon (or avatar) to wrap
  showDot? : boolean;     // red "unread" dot in the bottom-right corner
};

const TabIcon = ({children , showDot = false} : TabIconProps) => {
  return (
    <View>
      {children}
      {showDot && (
        <View style={styles.dot} />
      )}
    </View>
  );
};

export default TabIcon;

const styles = StyleSheet.create({
  dot: {
    position: 'absolute',
    right: -3,
    bottom: -3,
    width: 9,
    height: 9,
    borderRadius: 4.5,
    backgroundColor: Colors.dark.notification,
  },
});