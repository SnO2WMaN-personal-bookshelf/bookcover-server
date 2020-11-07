import {Module} from '@nestjs/common';
import {MongooseModule} from '@nestjs/mongoose';
import {CompensatorModule} from '../compensator/compensator.module';
import {NDLModule} from '../ndl/ndl.module';
import {OpenBDModule} from '../openbd/openbd.module';
import {BooksService} from './books.service';
import {Book, BookSchema} from './schema/book.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{name: Book.name, schema: BookSchema}]),
    OpenBDModule,
    NDLModule,
    CompensatorModule,
  ],
  providers: [BooksService],
  exports: [BooksService],
})
export class BooksModule {}
