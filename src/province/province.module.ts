import { Module } from '@nestjs/common';
import { ProvinceService } from './province.service';
import { ProvinceController } from './province.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { HttpService } from 'src/http/http.service';

@Module({
  controllers: [ProvinceController],
  providers: [ProvinceService, HttpService],
  imports: [PrismaModule]
})
export class ProvinceModule {}
