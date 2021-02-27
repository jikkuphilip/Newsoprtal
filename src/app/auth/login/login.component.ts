import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userList: any = [];
  Loginform: FormGroup;
  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.Loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.userList = localStorage.getItem('userlist')
      ? JSON.parse(localStorage.getItem('userlist'))
      : [];
  }

  login() {}
}
