import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthUserModel } from './models/auth.model';
import { Subject } from 'rxjs';

@Injectable()
export class AuthService{
    constructor(private http:HttpClient){}

    private isAuthenticated = new Subject<boolean>()
    tokenTimer:any;
    token:string;
    _id:string;
    role:string;
    authenticated:boolean= false;
    userChnanged = new Subject()

    signupUser(authUser:AuthUserModel){
        return this.http.post<{message:string,data:any,error:string|null}>('http://localhost:3000/api/auth/signup/',authUser)
    }

    loginUser(email:string,password:string){
        return this.http.post<{message:string,data:any,error:string|null}>('http://localhost:3000/api/auth/login/',{email:email,password:password})
    }

    exportAuthentication(){
        return this.isAuthenticated.asObservable()
    }


    saveAuthData(token:string,_id:string,expiresIn,role:string){
        const now = new Date()
        const expirationDate = new Date(now.getTime()+expiresIn*1000)
        this.isAuthenticated.next(true);
        this.authenticated = true;
        this.token=token;
        this._id=_id
        this.role=role;
        localStorage.setItem('token',token)
        localStorage.setItem('_id',_id)
        localStorage.setItem('expiration',expirationDate.toISOString())
        localStorage.setItem('role',role)
    }

    setAuthTimer (duration:number){
        console.log('setting timer : '+ duration)
        this.tokenTimer = setTimeout(()=>{
            this.logout()
       },duration*1000)
    }

    getAuthData(){
        const token = localStorage.getItem('token');
        const expirationDate = localStorage.getItem('expiration')
        const _id = localStorage.getItem('_id')
        const role = localStorage.getItem('role')
        if(!token&&!expirationDate){
            return;
        }
        return{
            token:token,
            expirationDate:new Date(expirationDate),
            _id:_id,
            role:role
        }
    }

    autoAuthUser(){
        const authInformation = this.getAuthData()
        if(!authInformation){
            this.isAuthenticated.next(false)
            this.authenticated = false;
            localStorage.clear()
            return ;
        }
        const now = new Date()
        const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
        if(expiresIn>0){
            this.token = authInformation.token
            this._id = authInformation._id
            this.role = authInformation.role
            this.isAuthenticated.next(true);
            this.authenticated=true
            this.setAuthTimer(expiresIn/1000)
        }
    }

    logout(){
        this.token = '';
        this._id = ''
        this.role=''
        localStorage.clear();
        clearTimeout(this.tokenTimer)
        this.isAuthenticated.next(false)
        this.authenticated = false
        this.userChnanged.next();
    }



}