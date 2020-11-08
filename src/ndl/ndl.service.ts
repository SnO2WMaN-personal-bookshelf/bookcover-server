import {HttpService, Injectable} from '@nestjs/common';

export function dehyphenated(isbn: string) {
  return isbn.replace(/-/g, '');
}

export interface APIPayload {
  summary: {
    isbn: string;
    cover?: string;
  };
}

@Injectable()
export class NDLService {
  constructor(private readonly httpService: HttpService) {}

  async getBookCover(isbn: string): Promise<string | null> {
    const url = `https://iss.ndl.go.jp/thumbnail/${dehyphenated(isbn)}`;

    return this.httpService
      .get(url)
      .toPromise()
      .then(({status}) => (status === 200 ? url : null))
      .catch((error) => null);
  }
}
