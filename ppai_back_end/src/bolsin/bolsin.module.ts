import { Module } from '@nestjs/common';
import { BolsinService } from './bolsin.service';
import { BolsinController } from './bolsin.controller';

@Module({
  controllers: [BolsinController],
  providers: [BolsinService],
})
export class BolsinModule {}
