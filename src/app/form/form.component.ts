import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../user';
@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Output() public submit = new EventEmitter<User>();
  public name = '';
  public email = '';

  public onSubmit() {
    const user = {
      name: this.name,
      email: this.email,
    };
    this.submit.emit(user);
    this.name = '';
    this.email = '';
  }
}
