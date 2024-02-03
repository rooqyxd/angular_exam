import { Component, ViewChild, Input } from '@angular/core';
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
  public points: number = 0;
  public scores: { score: number; time: number }[] = [];
  public gameStartTime: number | null = null;
  public gameDuration: number = 0;
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
    // console.log(this.user);

    this._snake.actionStart();
    this.gameStartTime = performance.now();
    this.gameDuration = 0;
    this.updateGameDuration();
  }
  private updateGameDuration() {
    if (this.gameStartTime !== null) {
      const currentTime = performance.now();
      this.gameDuration = Math.floor((currentTime - this.gameStartTime) / 1000);
      requestAnimationFrame(() => this.updateGameDuration());
    }
  }
  public onGrow() {
    this.points += 1;
    console.log('grow');
  }

  public onGameOver() {
    if (this.gameStartTime !== null) {
      const currentTime = performance.now();
      this.gameDuration = Math.floor((currentTime - this.gameStartTime) / 1000);
    }

    const gameResult = {
      score: this.points,
      time: this.gameDuration,
    };

    this.scores.push(gameResult);
    console.log('result to');
    console.log(gameResult);
    this.points = 0;
  }
}
