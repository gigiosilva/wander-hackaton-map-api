import { OsmService } from './osm.service';
import { Controller, Post, UseInterceptors, UploadedFile, Get, Query } from '@nestjs/common';
import { EtlService } from './etl.service';
import { CsvParser } from 'nest-csv-parser';
import { diskStorage } from 'multer';
import { FileInterceptor } from '@nestjs/platform-express';
import { extname } from 'path';

export const csvFileFilter = (req, file, callback) => {
  if (!file.originalname.match(/\.(csv)$/)) {
      return callback(new Error('Only CSV files are allowed!'), false);
  }
  callback(null, true);
};

export const csvFileName = (req, file, callback) => {
  callback(null, `${Date.now()}${extname(file.originalname)}`);
};

@Controller('etl')
export class EtlController {
  constructor(
    private readonly etlService: EtlService,
    private readonly csvParser: CsvParser,
    private readonly osmService: OsmService
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: './uploads/csv',
      filename: csvFileName
    }),
    fileFilter: csvFileFilter,
  }))
  async uploadFile(@UploadedFile() file) {
    try {
      const response = {
        message: "File uploaded successfully!",
        data: { 
          originalname: file.originalname,
          filename: file.filename,
        }
      };

      return response;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  @Get('insights')
  async getInsights() {
    const data = await this.etlService.getFile();
    const poorData = this.etlService.filterPoorData(data);
    const places = await this.etlService.getPlacesFromSource(poorData);

    return {
      data,
      insights: places.results.items
    };
  }

  @Get('data')
  async getData() {
    const data = await this.etlService.getFile();

    return data;
  }

  @Get('osm')
  async getOsmData(
    @Query() query
  ) {
    const lat = parseFloat(query.lat);
    const lon = parseFloat(query.lon);

    if (!lat || !lon) {
      return {
        message: 'Please provide lat and lon query params'
      }
    }

    const data = await this.osmService.getNearbyPOIs(lat, lon, 5000);

    return data;
  }
}