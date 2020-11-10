import {Controller, Get, Query, Res} from '@nestjs/common';
import {Response} from 'express';
import {BooksService} from './books/books.service';

@Controller()
export class AppController {
  constructor(private readonly bookService: BooksService) {}

  @Get()
  async image(@Query('id') id: string, @Res() res: Response) {
    return this.bookService.getCover(id).then((url) => {
      res.redirect(url);
    });
  }
}
