import { LatLng } from '../utils/location';

export class Place {
  title: string;
  imageUri: string;
  address: string;
  location: LatLng;
  id?: string;
  constructor(
    title: string,
    imageUri: string,
    address: string,
    location: LatLng,
    id?: string
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
    this.id = id;
  }
}
