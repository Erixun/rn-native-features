import { View, ViewStyle } from 'react-native';
import { OutlinedButton } from '../UI/OutlinedButton';
import { $previewArea } from './ImagePicker';

export const LocationPicker = () => {
  const getLocationHandler = () => {};

  const pickOnMapHandler = () => {};
  return (
    <View>
      <View style={$previewArea}></View>
      <View style={$actions}>
        <OutlinedButton onPress={getLocationHandler} icon="location">
          Locate User
        </OutlinedButton>
        <OutlinedButton onPress={pickOnMapHandler} icon="map">
          Pick on Map
        </OutlinedButton>
      </View>
    </View>
  );
};

const $actions: ViewStyle = {
  flexDirection: 'row',
  justifyContent: 'space-around',
};
