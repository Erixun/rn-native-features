import { Pressable, Text, TextStyle, ViewStyle } from 'react-native';
import { AppColors } from '../../theme/AppColors';

type ButtonProps = {
  onPress: () => void;
  children: string;
};

export const Button = ({ onPress, children }: ButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [$button, pressed && $pressed]}
    >
      <Text style={$text}>{children}</Text>
    </Pressable>
  );
};

const $button: ViewStyle = {
  paddingHorizontal: 12,
  paddingVertical: 8,
  margin: 4,
  backgroundColor: AppColors.primary800,
  elevation: 2,
  shadowColor: '#000000',
  shadowOpacity: 0.15,
  shadowOffset: { width: 1, height: 1 },
};

const $pressed: ViewStyle = { opacity: 0.7 };

const $text: TextStyle = {
  textAlign: 'center',
  fontSize: 16,
  color: AppColors.primary50,
};
