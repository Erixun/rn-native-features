import { RouteProp, useIsFocused } from '@react-navigation/native';
import { PlacesList } from '../components/Places/PlacesList';
import { RootScreens } from '../App';
import { useEffect, useState } from 'react';
import { Place } from '../models/Place';
import { retrievePlaces } from '../data/db';

export const AllPlaces = ({
  route,
}: {
  route: RouteProp<RootScreens, 'AllPlaces'>;
}) => {
  const [loadedPlaces, setLoadedPlaces] = useState<Place[]>();
  const [hasRetrieved, setHasRetrieved] = useState(false);
  const isFocused = useIsFocused();

  useEffect(() => {
    // if (!hasRetrieved) {
    // }
    if (isFocused) {
      retrievePlaces()
        .then(setLoadedPlaces)
        // .then(() => {
        //   setHasRetrieved(true);
        // });
      // const place = route.params.place;
      // setLoadedPlaces((currentPlaces) =>
      //   currentPlaces ? [...Array.from(currentPlaces), place] : [place]
      // );
      // insertData(place);
    }
  }, [isFocused, route, hasRetrieved]);

  return <PlacesList places={loadedPlaces} />;
};
