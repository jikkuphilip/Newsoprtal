import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  RegistrationForm: FormGroup;
  userList: any = [];
  submitted: boolean = false;
  isExisting: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.RegistrationForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.maxLength(20)]],
    });
    this.userList = localStorage.getItem('userlist')
      ? JSON.parse(localStorage.getItem('userlist'))
      : [];
  }

  checkexisting() {
    for (var i = 0; i < this.userList.length; i++) {
      if (this.userList[i].email == this.RegistrationForm.get('email').value) {
        this.isExisting = true;
        break;
      } else this.isExisting = false;
    }
  }

  registerUser() {
    this.submitted = true;
    if (this.RegistrationForm.valid && !this.isExisting) {
      this.userList.push(this.RegistrationForm.value);
      localStorage.setItem('userlist', JSON.stringify(this.userList));
      this.toastr.success('User Registered successfully');
      this.router.navigateByUrl('auth/login');
    }
  }
}
