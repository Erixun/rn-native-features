import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Alert, ViewStyle } from 'react-native';
import MapView, {
  Marker,
  LatLng,
  MarkerDragStartEndEvent,
  MapPressEvent,
} from 'react-native-maps';
import { RootScreens } from '../App';
import { Ionicons } from '@expo/vector-icons';

export const Map = ({
  navigation,
}: {
  navigation: NativeStackNavigationProp<RootScreens>;
}) => {
  const region = {
    latitude: 37.78,
    longitude: -122.43,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421, //sets zoom level of the map, indirectly
  };

  const [markerPosition, setMarkerPosition] = useState<LatLng>();

  const dragEndHandler = (event: MarkerDragStartEndEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setMarkerPosition({ latitude, longitude });
  };

  const selectLocationHandler = (event: MapPressEvent) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;

    setMarkerPosition({ latitude, longitude });
  };

  const savePickedLocationHandler = useCallback(() => { // helps us avoid unnecessary rerender-cycles
    if (!markerPosition)
      return Alert.alert(
        'No location to save',
        ' You must tap the map to pick a location first.'
      );

    navigation.navigate('AddPlace', { pickedLocation: markerPosition });
  }, [navigation, markerPosition]);

  useLayoutEffect(() => {
    //runs only when component is initially rendered
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <Ionicons
          name="md-save-sharp"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      initialRegion={region}
      style={$map}
      onPress={selectLocationHandler}
    >
      {markerPosition && (
        <Marker
          draggable
          coordinate={markerPosition}
          onDragEnd={dragEndHandler}
        />
      )}
    </MapView>
  );
};

const $map: ViewStyle = {
  flex: 1,
};
