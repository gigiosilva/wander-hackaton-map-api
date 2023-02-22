import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

@Injectable()
export class HereService {
  constructor(private readonly httpService: HttpService) {}

  getPlacesWithinBoundingBox(boundingBox) {
    const url = 'https://places.ls.hereapi.com/places/v1/discover/explore';
    const params = {
      at: `${boundingBox.topRight.lat},${boundingBox.topRight.lng};${boundingBox.bottomLeft.lat},${boundingBox.bottomLeft.lng}`,
      // apiKey: process.env.HERE_API_KEY,
      apiKey: 'a0PIZxzgaJjk4yaSRDsfkE0ae6E_Zdq0V5rB65o5Lbc',
    };
    const query = Object.keys(params)
      .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(params[k]))
      .join('&');
    const requestUrl = `${url}?${query}`;

    return this.httpService.axiosRef.get(requestUrl)
  }
}
