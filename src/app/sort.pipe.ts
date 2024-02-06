import { Pipe, PipeTransform } from '@angular/core';
interface MoveHistory {
  moves: string;
  times: number;
}
@Pipe({
  name: 'sort',
  standalone: true,
})
export class SortPipe implements PipeTransform {
  transform(
    values: Array<MoveHistory>,
    direction: string = 'asc'
  ): Array<MoveHistory> {
    if (!values || values.length <= 1) {
      return values;
    }

    if (direction === 'asc') {
      return values.sort((a, b) => a.times - b.times);
    } else if (direction === 'desc') {
      return values.sort((a, b) => b.times - a.times);
    } else {
      return values;
    }
  }
}
