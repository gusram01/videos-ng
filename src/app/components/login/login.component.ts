import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StoreService } from '../../services/store.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  login: FormGroup;
  hide = true;

  constructor(private fb: FormBuilder, private store: StoreService) {
    this.login = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    if (this.login.pristine || this.login.invalid) {
      return;
    }
    this.store.login(this.login.value);
  }
}