import { Alert, View, ViewStyle, Image, Text } from 'react-native';
import { OutlinedButton } from '../UI/OutlinedButton';
import { $previewArea, $previewText } from './ImagePicker';
import { useEffect, useState } from 'react';
import {
  PermissionStatus,
  getCurrentPositionAsync,
  requestForegroundPermissionsAsync,
} from 'expo-location';
import { LatLng, getMapPreview } from '../../utils/location';
import {
  NavigationProp,
  RouteProp,
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { RootScreens } from '../../App';
import { LatLng as LatLngLong } from 'react-native-maps';

type LocationPickerProps = {
  alreadyPickedLocation?: LatLngLong;
  onPickLocation: (location: LatLngLong) => void;
};

export const LocationPicker = ({
  alreadyPickedLocation,
  onPickLocation,
}: LocationPickerProps) => {
  const [pickedLocation, setPickedLocation] = useState<LatLng>();

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (hasPermission) {
      try {
        const position = await getCurrentPositionAsync();
        const latLng = toLatLng(position);
        setPickedLocation(latLng);
        onPickLocation(position.coords);
      } catch (err) {
        Alert.alert('Error', 'Failed to get current position');
      }
    }
  };

  const verifyPermissions = async () => {
    const { status } = await requestForegroundPermissionsAsync();
    if (status !== PermissionStatus.GRANTED)
      return Alert.alert('Permission to access location was denied');

    return true;
  };

  const route = useRoute<RouteProp<RootScreens>>();

  useEffect(() => {
    const alreadyPickedLocation = route.params?.pickedLocation;
    if (alreadyPickedLocation) {
      setPickedLocation(toLatLng({ coords: alreadyPickedLocation }));
      onPickLocation(alreadyPickedLocation);
    }
  }, [alreadyPickedLocation, onPickLocation]); // since onPickLocation is called in this useEffect it must be added as a dependency...
// if onPickLocation is a stable func that does not change betw rerenders, it should be wrapped with a useCallback hook
  function toLatLng({ coords }: { coords: LatLngLong }) {
    return {
      lat: coords.latitude,
      lng: coords.longitude,
    };
  }

  const navigation = useNavigation<NavigationProp<RootScreens>>();

  const pickOnMapHandler = () => {
    navigation.navigate('Map');
  };

  return (
    <View>
      <View style={$previewArea}>
        {pickedLocation ? (
          <Image
            style={{ width: '100%', height: '100%' }}
            source={{ uri: getMapPreview(pickedLocation) }}
          />
        ) : (
          <Text style={$previewText}>Pick a location to see a preview</Text>
        )}
      </View>
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
  marginTop: 5,
  flexDirection: 'row',
  justifyContent: 'space-around',
};
