import { RouteProp } from '@react-navigation/native';
import { PlaceForm } from '../components/Places/PlaceForm';
import { RootScreens } from '../App';

export const AddPlace = ({route}: {route: RouteProp<RootScreens>}) => {
  const pickedLocation = route.params?.pickedLocation
  return <PlaceForm pickedLocation={pickedLocation}/>;
};
