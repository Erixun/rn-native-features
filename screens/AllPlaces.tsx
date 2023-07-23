import { RouteProp, useIsFocused } from '@react-navigation/native';
import { PlacesList } from '../components/Places/PlacesList';
import { RootScreens } from '../App';
import { useEffect, useState } from 'react';
import { Place } from '../models/Place';
import { retrievePlaces } from '../data/db';

export const AllPlaces = ({ route }: AllPlacesProps) => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) retrievePlaces().then(setLoadedPlaces);
  }, [isFocused, route]);

  return <PlacesList places={loadedPlaces} />;
};

type AllPlacesProps = {
  route: RouteProp<RootScreens, 'AllPlaces'>;
};
