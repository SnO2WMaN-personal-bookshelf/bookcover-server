import {HttpModule, Module} from '@nestjs/common';
import {NDLService} from './ndl.service';

@Module({
  imports: [HttpModule],
  providers: [NDLService],
  exports: [NDLService],
})
export class NDLModule {}
