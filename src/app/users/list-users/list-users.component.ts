import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../user.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
    templateUrl: './list-users.component.html',
    styleUrls: ['./list-users.component.css']
})

export class ListUsersComponent implements OnInit,OnDestroy {
    fetchedUsers: User[]=[];
    fetchUsersSub:Subscription;
    isEditMode:boolean = false;
    _id:string;
    role:string;

    constructor(private userService:UserService,private router:Router,private authService:AuthService){}
    ngOnInit() {
        this.userService.getUsers().subscribe((response)=>{
            this.fetchedUsers = response.data;
        })

      this.fetchUsersSub =  this.userService.usersChanged.subscribe((response)=>{
            this.fetchedUsers = response
        })

    this._id = this.authService._id;
    this.role = this.authService.role;

    }

    onDelete(id:string){
        this.userService.deleteUser(id).subscribe((response)=>{
            console.log(response)
            this.userService.fetchUsersList()
        })
    }

    onEdit(user:User){
        this.userService.editData.next(user)
        this.router.navigate(['/edit',user._id])
    }

    disableLink(user){
        if((user._id==this._id)&& this.role=='user'){
            return false
        }else if(this.role == 'admin'){
            return false
        }else{
            return true
        }
    }

    ngOnDestroy(){
        this.fetchUsersSub.unsubscribe()
    }



}