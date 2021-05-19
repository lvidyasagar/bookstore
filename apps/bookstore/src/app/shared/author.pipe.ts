import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'authors',
})
export class AuthorPipe implements PipeTransform {
  transform(authors: string[]): string {
    let result = '';
    if (authors && authors.length > 0) {
      for (let i = 0; i <= authors.length - 1; i++) {
        if (i === authors.length - 1 && authors.length > 1) {
          result += ' and ';
        }
        result += authors[i];
      }
      return result;
    } else {
      return 'No Authors';
    }
  }
}
