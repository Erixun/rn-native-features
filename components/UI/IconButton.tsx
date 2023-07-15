import { Ionicons } from '@expo/vector-icons';
import { Pressable, ViewStyle } from 'react-native';

export const IconButton = ({ icon, size, color, onPress }: IconButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [$button, pressed && $pressed]}
      onPress={onPress}
    >
      <Ionicons name={icon} size={size} color={color} />
    </Pressable>
  );
};

const $button: ViewStyle = {
  padding: 8,
  margin: 5,
  justifyContent: 'center',
  alignItems: 'center',
};
const $pressed: ViewStyle = {
  opacity: 0.7,
};

type IconButtonProps = {
  icon: keyof typeof Ionicons.glyphMap;
  size: number;
  color?: string;
  onPress: () => void;
};
