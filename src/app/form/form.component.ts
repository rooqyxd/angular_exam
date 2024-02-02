import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
import { CommonModule, NgIf } from '@angular/common';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, FormsModule, NgIf],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Output() public submit = new EventEmitter<User>();
  public name = '';
  public email = '';
  public user: User | null = null;
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
    this.name = '';
    this.email = '';
  }
  private validateEmail(email: string): boolean {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
}
