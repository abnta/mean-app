import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './models/user.model';
import { Subject } from 'rxjs';

@Injectable()
export class UserService{

    constructor(private http:HttpClient){}

    fetchedUsers:User[]=[]

    usersChanged = new Subject<User[]>()

    editData = new Subject<User>()

    createUser(name:string,email:string,githubRepo:string,age:number,gender:string,about:string,dob:Date){
        const user = {
            name:name,
            email:email,
            githubRepo:githubRepo,
            age:age,
            gender:gender,
            about:about,
            dob:dob
        }
        return this.http.post<{message:string,data:User|null,error:string|null}>('http://localhost:3000/api/user/',user)
    }

    getUsers(){
        return this.http.get<{message:string,data:User[]|null,error:string|null}>('http://localhost:3000/api/user/')
    }

    deleteUser(id:string){
        return this.http.delete<{message:string,data:User[]|null,error:string|null}>('http://localhost:3000/api/user/'+id)
    }

    fetchUsersList(){
        this.getUsers().subscribe((response)=>{
            this.fetchedUsers = response.data
            this.usersChanged.next(this.fetchedUsers);
        })
    }

    fetchUser(id:string){
        return this.http.get<{message:string,data:User|null,error:string|null}>('http://localhost:3000/api/user/'+id)
           
    }

    updateUser(id:string,name:string,email:string,githubRepo:string,age:number,gender:string,about:string,dob:Date){

        const updatedUser = {
            name:name,
            email:email,
            githubRepo:githubRepo,
            age:age,
            gender:gender,
            about:about,
            dob:dob,
            id:id
        }

        return this.http.put<{message:string,data:User|null,error:string|null}>('http://localhost:3000/api/user/'+id,updatedUser)
    }

}