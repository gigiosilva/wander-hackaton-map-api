import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
// import * as OSM from 'osm-read';

interface POI {
  name: string;
  lat: number;
  lon: number;
}

@Injectable()
export class OsmService {
  constructor(private readonly httpService: HttpService) {}
  
  async getNearbyPOIs(lat: number, lon: number, radius: number) {
    console.log(lat, lon, radius);
    const lonPerYard = 1 / (111320 * Math.cos(lat * Math.PI / 180));

    const bbox = [
      lon - (radius / 111320 * Math.cos(lat * Math.PI / 180)),
      lat - (radius / 111320),
      lon + (radius * lonPerYard),
      lat + (radius / 111320),
    ];

    const bboxString = `(${bbox[1]},${bbox[0]},${bbox[3]},${bbox[2]})`;
    console.log(bbox)
    const node = `node["amenity"="restaurant"]`;
    const way = `way["amenity"="restaurant"]`;
    const relation = `relation["amenity"="restaurant"]`;

    const url = `https://www.overpass-api.de/api/interpreter?data=[out:json];${node}${bboxString};${way}${bboxString};out%20center;`;

    try {
      const response = await this.httpService.axiosRef.get(url);
      console.log(url);

      return response.data;

    } catch (error) {
      console.log(error);
      console.log(url);
      throw new Error('Error getting OSM data');
    }
  }
}
