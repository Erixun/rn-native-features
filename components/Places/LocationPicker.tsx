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

export const LocationPicker = ({
  alreadyPickedLocation,
}: {
  alreadyPickedLocation?: LatLngLong;
}) => {
  const [pickedLocation, setPickedLocation] = useState<LatLng>();
  const isFocused = useIsFocused() //???

  const getLocationHandler = async () => {
    const hasPermission = await verifyPermissions();

    if (hasPermission)
      getCurrentPositionAsync().then(toLatLng).then(setPickedLocation);
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
    if (alreadyPickedLocation)
      setPickedLocation(toLatLng({ coords: alreadyPickedLocation }));
  }, [alreadyPickedLocation]);

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
