import {Controller, Get, Param} from '@nestjs/common';
import {BooksService} from './books/books.service';

@Controller()
export class AppController {
  constructor(private readonly bookService: BooksService) {}

  @Get(':id')
  async findAll(@Param('id') id: string): Promise<string> {
    return this.bookService.getCover(id);
  }
}
