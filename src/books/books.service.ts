import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from '@nestjs/mongoose';
import {Model} from 'mongoose';
import {CompensatorService} from '../compensator/compensator.service';
import {NDLService} from '../ndl/ndl.service';
import {OpenBDService} from '../openbd/openbd.service';
import {Book} from './schema/book.schema';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private readonly bookModel: Model<Book>,
    private readonly openBDService: OpenBDService,
    private readonly ndlService: NDLService,
    private readonly compensantorService: CompensatorService,
  ) {}

  getBook(id: string) {
    return this.bookModel.findById(id).then((value) => {
      if (value) return value;
      throw new NotFoundException(`book:${id} does not exist.`);
    });
  }

  async getCover(id: string): Promise<string> {
    const book = await this.getBook(id);

    if (book.coverExists && book.cover) return book.cover;

    const source = await this.getImageSource(book);
    if (source) {
      await book.set('cover', source).set('coverExists', true).save();
      return source;
    }

    return this.compensantorService.getCompensateUrl(book);
  }

  async getImageSource(book: Book) {
    if (book?.isbn) {
      const openBD = await this.openBDService.getBookCover(book.isbn);
      if (openBD) return openBD;

      const ndl = await this.ndlService.getBookCover(book.isbn);
      if (ndl) return ndl;
    }
    return null;
  }
}
