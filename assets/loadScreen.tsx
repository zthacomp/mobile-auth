import { Colors } from "@/constants/Colors";
import { LoaderCircle } from "lucide-react-native";
import { Animated, Easing } from "react-native";

export const RotatingLoaderCircle: React.FC = () => {
  const rotateAnim = new Animated.Value(0);

  Animated.loop(
    Animated.timing(rotateAnim, {
      toValue: 1,
      duration: 2000,
      easing: Easing.linear,
      useNativeDriver: true,
    }),
  ).start();

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"],
  });

  const animatedStyle = {
    transform: [{ rotate: rotateInterpolate }],
  };

  return (
    <Animated.View style={animatedStyle}>
      <LoaderCircle color={Colors.MAIN} size={40} strokeWidth={2} />
    </Animated.View>
  );
};
