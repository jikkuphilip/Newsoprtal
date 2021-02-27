import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  userList: any = [];
  Loginform: FormGroup;
  isRegistered: boolean = false;
  submitted: boolean = false;
  constructor(
    private formBuilder: FormBuilder,
    private toast: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.Loginform = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
    this.userList = localStorage.getItem('userlist')
      ? JSON.parse(localStorage.getItem('userlist'))
      : [];
  }

  login() {
    this.submitted = true;
    if (this.Loginform.valid) {
      for (var i = 0; i < this.userList.length; i++) {
        if (
          this.Loginform.get('email').value == this.userList[i].email &&
          this.Loginform.get('password').value == this.userList[i].password
        ) {
          this.isRegistered = true;
          break;
        } else this.isRegistered = false;
      }
      if (this.isRegistered) {
        this.toast.success('Login Success');
        this.router.navigateByUrl('home');
      } else this.toast.error('Invalid Credentials');
    }
  }
}
