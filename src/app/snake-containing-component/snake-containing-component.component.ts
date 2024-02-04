import {
  Component,
  ViewChild,
  Input,
  EventEmitter,
  Output,
} from '@angular/core';
import { NgxSnakeComponent, NgxSnakeModule } from 'ngx-snake';
import { HotkeysService } from '@ngneat/hotkeys';
import { CommonModule } from '@angular/common';
import { User } from '../user';
import { NgClass } from '@angular/common';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-snake-containing-component',
  standalone: true,
  imports: [CommonModule, NgxSnakeModule, NgClass, FormComponent],
  providers: [HotkeysService],

  templateUrl: './snake-containing-component.component.html',
  styleUrl: './snake-containing-component.component.scss',
})
export class SnakeContainingComponentComponent {
  @ViewChild('game')
  private _snake!: NgxSnakeComponent;
  @Input() user: User | null = null;
  @Output() changeShowSnake = new EventEmitter<boolean>();
  public points: number = 0;
  public scores: {
    score: number;
    time: number;
    minutes: string;
    seconds: string;
  }[] = [];
  public gameStartTime: number | null = null;
  public gameDuration: number = 0;
  public gameDurationInMinutes: number = 0;
  public gameDurationInSeconds: number = 0;
  public actualScore: number = 0;
  public gameStatus: string = 'Game not started yet';
  public isGameActive: boolean = false;
  public isGameOver: boolean = false;
  public moveHistory: { move: string; time: number }[] = [];
  public gameStopTime: number | null = null; //
  public bw = false;
  constructor(private hotkeys: HotkeysService) {
    this._addHotkeys();
  }

  private _addHotkeys() {
    this.hotkeys
      .addShortcut({ keys: 'up' })
      .subscribe(() => this._snake.actionUp());
    this.hotkeys
      .addShortcut({ keys: 'left' })
      .subscribe(() => this._snake.actionLeft());
    this.hotkeys
      .addShortcut({ keys: 'down' })
      .subscribe(() => this._snake.actionDown());
    this.hotkeys
      .addShortcut({ keys: 'right' })
      .subscribe(() => this._snake.actionRight());
  }
  public showUser() {
    console.log(this.user);
  }
  public startGame() {
    this.isGameActive = true;
    this.gameStatus = 'Game started';

    if (this.gameStartTime === null) {
      this.gameStartTime = performance.now();
    } else if (this.gameStopTime !== null) {
      const pauseDuration = performance.now() - this.gameStopTime;
      this.gameStartTime += pauseDuration;
    }

    this._snake.actionStart();
    this.updateGameDuration();
    this.moveHistory.push({
      move: 'Game started',
      time: this.gameDuration,
    });
  }
  private updateGameDuration() {
    if (this.gameStartTime !== null && this.isGameActive) {
      const currentTime = performance.now();
      this.gameDuration = Math.floor((currentTime - this.gameStartTime) / 1000);
      requestAnimationFrame(() => this.updateGameDuration());
    }
  }
  public onGrow() {
    this.actualScore += 1;
    this.points += 1;
    this.moveHistory.push({
      move: 'Got 1 point',
      time: this.gameDuration,
    });
    console.log('grow');
  }

  public onGameOver() {
    this.isGameActive = false;
    this.isGameOver = true;
    if (this.gameStartTime !== null) {
      const currentTime = performance.now();
      this.gameDuration = Math.floor((currentTime - this.gameStartTime) / 1000);
    }

    const gameResult = {
      score: this.points,
      time: this.gameDuration,
      minutes: Math.floor(this.gameDuration / 60) + 'min.',
      seconds: (this.gameDuration % 60) + 'sec.',
    };
    this.gameStatus = 'Game over';
    this.moveHistory.push({
      move: 'Game stopped',
      time: this.gameDuration,
    });
    this.scores.push(gameResult);
    this.points = 0;
    this.gameDuration = 0;
  }
  public onReset() {
    this.isGameOver = false;
    this.gameStatus = 'Game reseted';
    this.points = 0;
    this.gameDuration = 0;
    this._snake.actionReset();
    this.gameStartTime = null;
    this.moveHistory = [];
  }
  public onStop() {
    this.isGameActive = false;
    this.gameStatus = 'Game stopped';
    this.gameStopTime = performance.now();
    this._snake.actionStop();
    this.moveHistory.push({
      move: 'Game stopped',
      time: this.gameDuration,
    });
  }
  public exitGame() {
    this.changeShowSnake.emit(false);
    this.onReset();
  }
}
