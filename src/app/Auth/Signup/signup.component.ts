import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { AuthUserModel } from '../models/auth.model';
import { Router } from '@angular/router';

@Component({
    templateUrl:'./signup.component.html',
    styleUrls:['./signup.component.css']
})

export class SignupComponent{

    constructor(private authService:AuthService,private router:Router){}

    roles:[{value:string},{value:string}]=[
        {value:'admin'},
        {value:'user'}
    ]

    onSignup(form:NgForm){
        console.log(form.value)
        const authUser:AuthUserModel = {
            email:form.value.email,
            password:form.value.password,
            role:form.value.role
        }
        this.authService.signupUser(authUser).subscribe((response)=>{
            console.log(response);
            this.router.navigate(['/login'])
        })
    }

}