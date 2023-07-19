import { useCallback, useState } from 'react';
import {
  ScrollView,
  TextInput,
  View,
  Text,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { AppColors } from '../../theme/AppColors';
import { ImagePickerElement } from './ImagePicker';
import { LocationPicker } from './LocationPicker';
import { LatLng } from 'react-native-maps';
import { Button } from '../UI/Button';

export const PlaceForm = ({ pickedLocation }: { pickedLocation?: LatLng }) => {
  const [enteredTitle, setEnteredTitle] = useState<string>();
  const [formImage, setFormImage] = useState<string>();
  const [formLocation, setFormLocation] = useState<LatLng>();

  const changeTitleHandler = (enteredText: string) => {
    setEnteredTitle(enteredText);
  };

  const takeImageHandler = (uri: string) => {
    setFormImage(uri);
  };

  const pickLocationHandler = useCallback((location: LatLng) => {
    setFormLocation(location);
  }, []); //useCallback ensures that the func isnt recreated unecessarily when passed as prop
  //otherwise this func will be reacreated whenever this (PlaceForm) component is rerendered.
  const savePlaceHandler = () => {
    console.log('Form content:')
    console.log(enteredTitle);
    console.log(formImage);
    console.log(formLocation);
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
        <ImagePickerElement onTakeImage={takeImageHandler} />
        <LocationPicker
          alreadyPickedLocation={pickedLocation}
          onPickLocation={pickLocationHandler}
        />
        <Button onPress={savePlaceHandler}>Save Place</Button>
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
  borderRadius: 3,
  backgroundColor: AppColors.primary100,
};
