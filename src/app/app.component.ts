import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormComponent } from './form/form.component';
import { HotkeysModule } from '@ngneat/hotkeys';
import { User } from './user';
import { SnakeContainingComponentComponent } from './snake-containing-component/snake-containing-component.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    FormComponent,
    HotkeysModule,
    SnakeContainingComponentComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  showSnake = false;
  user: User | null = null;

  onShowSnake(event: boolean) {
    this.showSnake = event;
  }

  onUserCreated(user: User) {
    this.user = user;
  }
}
