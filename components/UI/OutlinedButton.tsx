import { Ionicons } from '@expo/vector-icons';
import { Pressable, Text, TextStyle, ViewStyle } from 'react-native';
import { AppColors } from '../../theme/AppColors';

export const OutlinedButton = ({
  onPress,
  icon,
  children,
}: OutlineButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [$button, pressed && $pressed]}
    >
      <Ionicons name={icon} style={$icon} size={16} />
      <Text style={$text}>{children}</Text>
    </Pressable>
  );
};

const $button: ViewStyle = {
  paddingHorizontal: 12,
  paddingVertical: 6,
  margin: 4,
  marginBottom: 16,
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  borderWidth: 1,
  borderColor: AppColors.primary500,
};

const $pressed: ViewStyle = { opacity: 0.7 };

const $icon: TextStyle = { marginRight: 6, marginBottom: -1, color: AppColors.primary500 };

const $text: TextStyle = { color: AppColors.primary500 };

type OutlineButtonProps = {
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
  children: string;
};
