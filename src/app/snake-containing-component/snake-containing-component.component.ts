import { Component, ViewChild } from '@angular/core';
import { NgxSnakeComponent, NgxSnakeModule } from 'ngx-snake';
import { HotkeysService } from '@ngneat/hotkeys';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-snake-containing-component',
  standalone: true,
  imports: [CommonModule, NgxSnakeModule],
  providers: [HotkeysService],
  templateUrl: './snake-containing-component.component.html',
  styleUrl: './snake-containing-component.component.scss',
})
export class SnakeContainingComponentComponent {
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
    console.log('grow');
  }

  public onGameOver() {
    alert('game over');
  }

  // private _addHotkeys() {
  //   this._hotkeysService.add(
  //     new Hotkey('up', (event: KeyboardEvent): boolean => {
  //       this._snake.actionUp();
  //       return false; // Prevent bubbling
  //     })
  //   );

  //   this._hotkeysService.add(
  //     new Hotkey('left', (event: KeyboardEvent): boolean => {
  //       this._snake.actionLeft();
  //       return false; // Prevent bubbling
  //     })
  //   );

  //   this._hotkeysService.add(
  //     new Hotkey('down', (event: KeyboardEvent): boolean => {
  //       this._snake.actionDown();
  //       return false; // Prevent bubbling
  //     })
  //   );

  //   this._hotkeysService.add(
  //     new Hotkey('right', (event: KeyboardEvent): boolean => {
  //       this._snake.actionRight();
  //       return false; // Prevent bubbling
  //     })
  //   );
  // }
}
