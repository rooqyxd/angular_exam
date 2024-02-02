import { Component, ViewChild, Input } from '@angular/core';
import { NgxSnakeComponent, NgxSnakeModule } from 'ngx-snake';
import { HotkeysService } from '@ngneat/hotkeys';
import { CommonModule } from '@angular/common';
import { User } from '../user';
@Component({
  selector: 'app-snake-containing-component',
  standalone: true,
  imports: [CommonModule, NgxSnakeModule],
  providers: [HotkeysService],
  templateUrl: './snake-containing-component.component.html',
  styleUrl: './snake-containing-component.component.scss',
})
export class SnakeContainingComponentComponent {
  @Input() user: User | null = null;
  public points: number = 0;

  public bw = false;

  @ViewChild('game')
  private _snake!: NgxSnakeComponent;

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
  public onGrow() {
    this.points += 1;
    console.log('grow');
  }

  public onGameOver() {
    alert('game over');
  }
}
