import { RouteProp, NavigationProp } from '@react-navigation/native';
import { PlaceForm } from '../components/Places/PlaceForm';
import { RootScreens } from '../App';
import { Place } from '../models/Place';
import { insertPlace } from '../data/db';

export const AddPlace = ({ navigation, route }: AddPlaceProps) => {
  const pickedLocation = route.params?.pickedLocation;

  const createPlaceHandler = async (data: Place) => {
    await insertPlace(data);

    navigation.navigate('AllPlaces'); //, { place: data });
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
