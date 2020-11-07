import {HttpService, Injectable} from '@nestjs/common';

export interface APIPayload {
  summary: {
    isbn: string;
    cover?: string;
  };
}

@Injectable()
export class OpenBDService {
  constructor(private readonly httpService: HttpService) {}

  async getBookCover(isbn: string): Promise<string | null> {
    return this.httpService
      .get<(APIPayload | null)[]>('https://api.openbd.jp/v1/get', {
        params: {isbn},
      })
      .toPromise()
      .then(({data}) => data?.[0]?.summary.cover || null);
  }
}
