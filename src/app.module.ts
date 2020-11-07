import {Module} from '@nestjs/common';
import {ConfigModule} from '@nestjs/config';
import {MongooseModule} from '@nestjs/mongoose';
import {AppController} from './app.controller';
import {BooksModule} from './books/books.module';
import {CompensatorModule} from './compensator/compensator.module';
import mongooseConfig from './mongoose/mongoose.config';
import {MongooseService} from './mongoose/mongoose.service';
import {NDLModule} from './ndl/ndl.module';
import {OpenBDModule} from './openbd/openbd.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule.forFeature(mongooseConfig)],
      useClass: MongooseService,
    }),
    OpenBDModule,
    NDLModule,
    CompensatorModule,
    BooksModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
