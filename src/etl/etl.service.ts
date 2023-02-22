import { Injectable } from '@nestjs/common';
import { createReadStream, readdirSync } from 'fs';
import { CsvParser, ParsedData } from 'nest-csv-parser';
import { join } from 'path';
import { HereService } from './here.service';
import { Template } from './template.model';

@Injectable()
export class EtlService {
  constructor(
    private readonly csvParser: CsvParser,
    private readonly hereService: HereService
  ) {}

  async getFile() {
    const folderPath = join(__dirname, "..", "..", "..", "uploads/csv");
    const files = readdirSync(folderPath);
    const stream = createReadStream(`${folderPath}/${files[0]}`);
    const entities: ParsedData<Template> = await this.csvParser.parse(stream, Template, null, null, { separator: ';' });
    const data = entities.list.map(item => {
      return {
        ...item,
        latitude: item.latitude.replace(',', '.'),
        longitude: item.longitude.replace(',', '.'),
      }
    });

    return data;
  }

  filterPoorData(data: Template[]) {
    const poorData = data.filter(item => !item.description || !item.photo1 || !item.photo2);

    return poorData;
  }

  async getPlacesFromSource(data: Template[]) {
    const boundingBox = this.getBoundingBox(data, 0.5);
    const { data: places } = await this.hereService.getPlacesWithinBoundingBox(boundingBox);

    return places;
  }

  getBoundingBox(positions, marginKm) {
    const margin = marginKm * 0.00898315284; // Convert margin from km to degrees
  
    let minLat = Infinity;
    let maxLat = -Infinity;
    let minLng = Infinity;
    let maxLng = -Infinity;
  
    for (let i = 0; i < positions.length; i++) {
      const position = positions[i];
      const lat = parseFloat(position.latitude.replace(',', '.'));
      const lng = parseFloat(position.longitude.replace(',', '.'));
      minLat = Math.min(minLat, lat);
      maxLat = Math.max(maxLat, lat);
      minLng = Math.min(minLng, lng);
      maxLng = Math.max(maxLng, lng);
    }
  
    const boundingBox = {
      topRight: {
        lat: maxLat + margin,
        lng: maxLng + margin,
      },
      bottomLeft: {
        lat: minLat - margin,
        lng: minLng - margin,
      },
    };
  
    return boundingBox;
  }
}
