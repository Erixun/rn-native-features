import { View, Image, Pressable } from 'react-native';
import { Place } from '../../models/Place';

export const PlaceItem = ({ place }: PlaceItemProps) => {
  return (
    <Pressable
      onPress={() => console.log('PlaceItem press not implemented yet')}
    >
      <Image source={{ uri: place.imageUri }} />
      <View>
        <View>{place.title}</View>
        <View>{place.address}</View>
      </View>
    </Pressable>
  );
};

type PlaceItemProps = {
  place: Place;
};
