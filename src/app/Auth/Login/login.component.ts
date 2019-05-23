import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Component({
    templateUrl:'./login.component.html',
    styleUrls:['./login.component.css']
})

export class LoginComponent{

    constructor(private authService:AuthService,private router : Router){}

    onLogin(loginForm:NgForm){
        if(loginForm.invalid){
            return ;
        }
        this.authService.loginUser(loginForm.value.email,loginForm.value.password)
            .subscribe((response)=>{
                console.log(response)
                if(response.message == 'success' && response.data != null){
                   this.authService.saveAuthData(response.data.token,response.data._id,response.data.expiresIn,response.data.role)
                   this.authService.setAuthTimer(response.data.expiresIn)
                }
                this.authService.userChnanged.next()
                this.router.navigate(['/'])
            })
    }
}