import { LatLng as LatLngLong } from 'react-native-maps';

const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

export const getMapPreview = ({ lat, lng }: LatLng) => {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:I%7C${lat},${lng}
  &key=${GOOGLE_API_KEY}`;

  return imagePreviewUrl;
};

export const getAddress = async ({ lat, lng }: LatLng) => {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  console.log(url)
  const response = await fetch(url);

  if (!response.ok) {
    console.log(GOOGLE_API_KEY);
    console.log(response);
    throw Error('Failed to get address');
  }

  const data = await response.json();
  
  const address = data.results[0].formatted_address;
  return address;
};

export const toLatLng = ({ coords }: { coords: LatLngLong }) => {
  return {
    lat: coords.latitude,
    lng: coords.longitude,
  };
};

export const toLatLngLong = (latLng: LatLng): LatLngLong => {
  return {
    latitude: latLng.lat,
    longitude: latLng.lng,
  };
};

export type LatLng = {
  lat: number;
  lng: number;
};

export { LatLngLong };

export type LocationAddress = { address: string } & LatLngLong;
