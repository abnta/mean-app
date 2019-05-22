import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './header/header.component';
import { CreateUserComponent } from './users/create-user/create-user.component'
import { ListUsersComponent } from './users/list-users/list-users.component'
import { SignupComponent } from './Auth/Signup/signup.component'
import { LoginComponent } from './Auth/Login/login.component'
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCardModule} from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatExpansionModule} from '@angular/material/expansion';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { UserService } from './users/user.service';
import { AuthService } from './Auth/auth.service';
import { RequestInterceptor } from './Auth/request.interceptor';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CreateUserComponent,
    ListUsersComponent,
    SignupComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    FormsModule,
    MatCardModule,
    MatExpansionModule
  ],
  providers: [MatNativeDateModule,UserService,AuthService,{provide: HTTP_INTERCEPTORS,useClass:RequestInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
