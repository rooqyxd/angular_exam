import { Pipe, PipeTransform } from '@angular/core';
interface Highscores {
  score: number;
  time: number;
  minutes: string;
  seconds: string;
}
@Pipe({
  name: 'sortHighscores',
  standalone: true,
})
export class SortHighscoresPipe implements PipeTransform {
  transform(values: Array<Highscores>, sortBy: string): Array<Highscores> {
    if (!sortBy) {
      return values;
    } else if (sortBy === 'score') {
      return values.sort((a, b) => a.score - b.score);
    } else if (sortBy === 'time') {
      return values.sort((a, b) => a.time - b.time);
    } else {
      return values;
    }
  }
}
