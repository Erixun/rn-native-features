import { RouteProp, NavigationProp } from '@react-navigation/native';
import { PlaceForm } from '../components/Places/PlaceForm';
import { RootScreens } from '../App';
import { Place } from '../models/Place';

export const AddPlace = ({ navigation, route }: AddPlaceProps) => {
  const pickedLocation = route.params?.pickedLocation;

  const createPlaceHandler = (data: Place) => {
    navigation.navigate('AllPlaces', { place: data });
  };

  return (
    <PlaceForm
      pickedLocation={pickedLocation}
      onCreatePlace={createPlaceHandler}
    />
  );
};

type AddPlaceProps = {
  navigation: NavigationProp<RootScreens>;
  route: RouteProp<RootScreens, 'AddPlace'>;
};
