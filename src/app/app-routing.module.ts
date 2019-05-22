import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListUsersComponent } from './users/list-users/list-users.component';
import { CreateUserComponent } from './users/create-user/create-user.component';
import { SignupComponent } from './Auth/Signup/signup.component';
import { LoginComponent } from './Auth/Login/login.component';

const routes: Routes = [
  {path:'',component:ListUsersComponent, pathMatch:'full'},
  {path:'create',component:CreateUserComponent},
  {path:'edit/:id',component:CreateUserComponent},
  {path:'signup',component:SignupComponent},
  {path:'login',component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
