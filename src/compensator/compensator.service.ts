import {Inject, Injectable} from '@nestjs/common';
import {ConfigType} from '@nestjs/config';
import * as querystring from 'querystring';
import {URL} from 'url';
import {Book} from '../books/schema/book.schema';
import compensatorConfig from './compensator.config';

@Injectable()
export class CompensatorService {
  constructor(
    @Inject(compensatorConfig.KEY)
    private configService: ConfigType<typeof compensatorConfig>,
  ) {}

  async getCompensateUrl(book: Book) {
    return new URL(
      `${this.configService.url}?${querystring.stringify({title: book.title})}`,
    ).toString();
  }
}
