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
import { LatLng as LatLngLong } from 'react-native-maps';
import { Button } from '../UI/Button';
import { LocationAddress, getAddress, toLatLng } from '../../utils/location';
import { Place } from '../../models/Place';

export const PlaceForm = ({
  pickedLocation,
  onCreatePlace,
}: {
  pickedLocation?: LatLngLong;
  onCreatePlace: (data: Place) => void;
}) => {
  const [enteredTitle, setEnteredTitle] = useState<string>();
  const [formImage, setFormImage] = useState<string>();
  const [formLocation, setFormLocation] = useState<LocationAddress>();
  // const [address, setAddress] = useState<string>();

  const changeTitleHandler = (enteredText: string) => {
    setEnteredTitle(enteredText);
  };

  const takeImageHandler = (uri: string) => {
    setFormImage(uri);
  };

  const pickLocationHandler = useCallback(async (location: LatLngLong) => {
    const latLng = toLatLng({ coords: location });
    try {
      const address = await getAddress(latLng);
      setFormLocation({ ...location, address });
    } catch (error) {
      console.log(error);
    }
    // setAddress(address);
  }, []); //useCallback ensures that the func isnt recreated unecessarily when passed as prop
  //otherwise this func will be reacreated whenever this (PlaceForm) component is rerendered.
  const savePlaceHandler = () => {
    // console.log('Form content:');
    // console.log(enteredTitle);
    // console.log(formImage);
    // console.log(formLocation);
    if (!(enteredTitle && formImage && formLocation)) return;
    
    const { address, ...location } = formLocation;
    const latLng = toLatLng({ coords: location });
    const placeData = new Place(enteredTitle, formImage, address, latLng);
    onCreatePlace(placeData);
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
