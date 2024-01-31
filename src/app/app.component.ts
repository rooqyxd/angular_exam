import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form/form.component';
import { User } from './user';
import { SnakeContainingComponentComponent } from './snake-containing-component/snake-containing-component.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormComponent, SnakeContainingComponentComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  handleUserSubmit(user: User) {
    console.log(user);
  }
}
