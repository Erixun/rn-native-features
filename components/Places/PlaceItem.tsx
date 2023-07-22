import {
  View,
  Image,
  Pressable,
  Text,
  ViewStyle,
  ImageStyle,
  TextStyle,
} from 'react-native';
import { Place } from '../../models/Place';
import { AppColors } from '../../theme/AppColors';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { RootScreens } from '../../App';
import { getPlaceDetails } from '../../data/db';

export const PlaceItem = ({ place }: PlaceItemProps) => {
  const navigation = useNavigation<NavigationProp<RootScreens>>();

  const goToPlaceDetails = async () => {
    // const plc = getPlaceDetails(place.id)
    navigation.navigate('PlaceDetails', { placeId: place.id! });
  };
  return (
    <Pressable
      style={({ pressed }) => [$item, pressed && $pressed]}
      onPress={goToPlaceDetails}
    >
      <Image style={$image} source={{ uri: place.imageUri }} />
      <View style={$textContainer}>
        <Text style={$title}>{place.title}</Text>
        <Text style={$address} numberOfLines={3}>
          at {place.address}
        </Text>
      </View>
    </Pressable>
  );
};

const $item: ViewStyle = {
  height: 120,
  backgroundColor: AppColors.primary100,
  margin: 3,
  flexDirection: 'row',
  // gap: 8,
  elevation: 3,
  shadowColor: '#000000',
  shadowOpacity: 0.15,
  shadowOffset: { width: 1, height: 1 },
  shadowRadius: 2,
  borderRadius: 4,
  overflow: 'hidden',
};

const $pressed: ViewStyle = {
  opacity: 0.9,
};

const $image: ImageStyle = {
  height: '100%',
  aspectRatio: 1,
};

const $textContainer: ViewStyle = {
  justifyContent: 'center',
  alignItems: 'flex-start',
  maxWidth: '100%',
  padding: 15,
  flex: 1,
};

const $title: TextStyle = {
  fontSize: 20,
  fontWeight: 'bold',
  marginBottom: 4,
};

const $address: TextStyle = {
  fontSize: 15,
};

type PlaceItemProps = {
  place: Place;
};
