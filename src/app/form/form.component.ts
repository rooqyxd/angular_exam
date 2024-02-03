import {
  Component,
  EventEmitter,
  Output,
  Input,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import { CommonModule, NgIf } from '@angular/common';
import { NgxSnakeComponent, NgxSnakeModule } from 'ngx-snake';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf, NgxSnakeModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Output() public submit = new EventEmitter<User>();
  @Output() public showSnakeEvent = new EventEmitter<boolean>();
  @Input() pass!: () => void;
  public name = '';
  public email = '';
  public user: User | null = null;
  public isSnakeVisible = false;
  public onSubmit() {
    if (!this.name || this.name.length < 2) {
      alert('Invalid name');
      return;
    }
    if (!this.email || !this.validateEmail(this.email)) {
      alert('Invalid e-mail');
      return;
    }
    const user = {
      name: this.name,
      email: this.email,
    };
    this.user = user;
    console.log(user);
    this.submit.emit(user);
    this.openSnake();
    this.name = '';
    this.email = '';
  }
  public openSnake() {
    this.isSnakeVisible = true;
    this.showSnakeEvent.emit(true);
  }
  public closeSnake() {
    this.isSnakeVisible = false;
    this.showSnakeEvent.emit(false);
  }
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
