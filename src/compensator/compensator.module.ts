import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import compensatorConfig from './compensator.config';
import {CompensatorService} from './compensator.service';

@Module({
  imports: [ConfigModule.forFeature(compensatorConfig)],
  providers: [CompensatorService],
  exports: [CompensatorService],
})
export class CompensatorModule {}
