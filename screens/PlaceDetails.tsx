import { Image, View, Text, ActivityIndicator } from 'react-native';
import { OutlinedButton } from '../components/UI/OutlinedButton';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { RootScreens } from '../App';
import { AppColors } from '../theme/AppColors';
import { useEffect, useState } from 'react';
import { Place } from '../models/Place';
import { getPlaceDetails } from '../data/db';
import { toLatLngLong } from '../utils/location';

export const PlaceDetails = ({ route, navigation }: PlaceDetailsProps) => {
  if (!route.params) return;

  const [place, setPlace] = useState<Place>();

  const placeId = route.params.placeId;

  useEffect(() => {
    getPlaceDetails(placeId)
      .then((place) => {
        if (!place) throw new Error('Place is undefined');

        setPlace(place);
        navigation.setOptions({
          title: place.title,
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, [route]);

  const showOnMap = () => {
    if (!place) return;
    console.log(place)
    const latLng = toLatLngLong(place.location);
    navigation.navigate('Map', { latLng: latLng });
  };

  if (!place) return <ActivityIndicator style={{ flex: 1 }} size={'large'} />;

  return (
    <View style={{ flex: 1, justifyContent: 'flex-start', gap: 15 }}>
      <Image
        style={{ width: '100%', aspectRatio: 2 }}
        source={{ uri: place.imageUri }}
      />
      <View style={{ paddingHorizontal: 15, gap: 5 }}>
        {/* <Text style={{ color: AppColors.primary100, fontSize: 20 }}>
          {place.title}
        </Text> */}
        <Text
          style={{
            color: AppColors.primary100,
            fontSize: 16,
            textAlign: 'center',
          }}
        >
          {place.address}
        </Text>
      </View>
      <OutlinedButton
        icon="map"
        onPress={showOnMap}
      >
        Show on map
      </OutlinedButton>
    </View>
  );
};

type PlaceDetailsProps = {
  route: RouteProp<RootScreens, 'PlaceDetails'>;
  navigation: NavigationProp<RootScreens, 'PlaceDetails'>;
};
