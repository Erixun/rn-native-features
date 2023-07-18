export const getMapPreview = ({ lat, lng }: LatLng) => {
  const GOOGLE_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:I%7C${lat},${lng}
  &key=${GOOGLE_API_KEY}`;

  return imagePreviewUrl;
};

export type LatLng = {
  lat: number;
  lng: number;
};
