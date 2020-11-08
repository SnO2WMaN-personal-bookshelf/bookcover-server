import {Controller, Get, Query} from '@nestjs/common';
import {BooksService} from './books/books.service';

@Controller()
export class AppController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async findAll(@Query('id') id: string): Promise<string> {
    return this.bookService.getCover(id);
  }
}
