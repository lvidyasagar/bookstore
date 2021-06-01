import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'htmltagremove',
})
export class DescriptionPipe implements PipeTransform {
  transform(str: string): string {
    if (str === null || str === '' || str === undefined) {
      return 'No Description';
    } else {
      str = str.toString();
    }
    return str.replace(/(<([^>]+)>)/gi, '');
  }
}
