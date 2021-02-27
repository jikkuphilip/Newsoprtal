import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: '', redirectTo: 'login' },
      {
        path: 'login',
        component: LoginComponent,
      },
      { path: 'register', component: RegisterComponent },
    ]),
  ],

  exports: [RouterModule],
  // providers: [ProductListService]
})
export class AuthRoutingModule {}
