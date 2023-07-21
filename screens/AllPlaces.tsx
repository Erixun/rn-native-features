import { RouteProp, useIsFocused } from '@react-navigation/native';
import { PlacesList } from '../components/Places/PlacesList';
import { RootScreens } from '../App';
import { useEffect, useState } from 'react';
import { Place } from '../models/Place';
import { db, insertData, retrieveData } from '../data/db';

export const AllPlaces = ({
  route,
}: {
  route: RouteProp<RootScreens, 'AllPlaces'>;
}) => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>();
  const [hasRetrieved, setHasRetrieved] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    if (!hasRetrieved) {
      retrieveData()
        .then(setLoadedPlaces)
        .then(() => {
          setHasRetrieved(true);
        });
    }
    if (isFocused && route.params) {
      const place = route.params.place;
      setLoadedPlaces((currentPlaces) =>
        currentPlaces ? [...Array.from(currentPlaces), place] : [place]
      );
      insertData(place);
    }
  }, [isFocused, route, hasRetrieved]);

  return <PlacesList places={loadedPlaces} />;
};
