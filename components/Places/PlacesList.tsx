import { FlatList, TextStyle, View, Text, ViewStyle } from 'react-native';
import { Place } from '../../models/Place';
import { PlaceItem } from './PlaceItem';

export const PlacesList = ({ places }: { places?: Place[] }) => {
  if (!places || places.length < 1)
    return (
      <View style={$fallBackContainer}>
        <Text style={$fallbackText}>
          No places added yet - start adding some
        </Text>
      </View>
    );

  const toPlaceItem = ({ item }: { item: Place }) => <PlaceItem place={item} />;

  return (
    <FlatList
      data={places}
      keyExtractor={(item: Place) => item.id}
      renderItem={toPlaceItem}
    />
  );
};

const $fallBackContainer: ViewStyle = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const $fallbackText: TextStyle = {
  fontSize: 16,
};
