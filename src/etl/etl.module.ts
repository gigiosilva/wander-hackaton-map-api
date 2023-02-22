import { Module } from '@nestjs/common';
import { EtlService } from './etl.service';
import { EtlController } from './etl.controller';
import { CsvModule } from 'nest-csv-parser';
import { HereService } from './here.service';
import { HttpModule } from '@nestjs/axios';
import { OsmService } from './osm.service';

@Module({
  imports: [
    CsvModule,
    HttpModule
  ],
  controllers: [EtlController],
  providers: [EtlService, HereService, OsmService]
})
export class EtlModule {}
