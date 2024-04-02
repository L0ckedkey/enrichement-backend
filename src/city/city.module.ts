import { Module } from '@nestjs/common';
import { CityService } from './city.service';
import { CityController } from './city.controller';
import { HttpService } from 'src/http/http.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [CityController],
  providers: [CityService, HttpService],
  imports: [PrismaModule]
})
export class CityModule {}
