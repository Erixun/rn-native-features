import { useState } from 'react';
import {
  ScrollView,
  TextInput,
  View,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { AppColors } from '../../theme/AppColors';

export const PlaceForm = () => {
  const [enteredTitle, setEnteredTitle] = useState('');

  const changeTitleHandler = (enteredText: string) => {
    setEnteredTitle(enteredText);
  };
  return (
    <ScrollView>
      <View style={$form}>
        <Text style={$label}>Title</Text>
        <TextInput
          style={$input}
          onChangeText={changeTitleHandler}
          value={enteredTitle}
        />
      </View>
    </ScrollView>
  );
};

const $form: ViewStyle = {
  flex: 1,
  padding: 24,
};

const $label: TextStyle = {
  fontWeight: 'bold',
  fontSize: 18,
  marginBottom: 4,
  color: AppColors.primary500,
};

const $input: TextStyle = {
  marginVertical: 8,
  paddingHorizontal: 4,
  paddingVertical: 8,
  fontSize: 16,
  borderBottomColor: AppColors.primary700,
  borderBottomWidth: 2,
  borderRadius: 4,
  backgroundColor: AppColors.primary100,
};
