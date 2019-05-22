import { Component, OnInit, OnDestroy } from '@angular/core';

import { FormGroup, Validators, FormControl } from '@angular/forms';

import {ValidateUrl} from './../validators/url.validator'
import { UserService } from '../user.service';
import { User } from '../models/user.model';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
    templateUrl:'./create-user.component.html',
    styleUrls:['./create-user.component.css']
})

export class CreateUserComponent implements OnInit, OnDestroy{
    constructor(private userService:UserService,private router:Router,private route:ActivatedRoute
        // ,private authService:AuthService
        ){}

    editMode :boolean = false;
    fetchedUser:User;
    // isAuthenticated:boolean=false
    // editModeSubs:Subscription;


    genders:[{value:string},{value:string},{value:string}] = [
        {value:'Male'},
        {value:'Female'},
        {value:'Others'}
    ]

    form:FormGroup;

    ngOnInit(){

        
            this.form = new FormGroup({
                name: new FormControl(null, {validators: [Validators.required]}),
                email: new FormControl(null, { validators: Validators.compose([Validators.email, Validators.required]) }),
                githubRepo: new FormControl(null, [Validators.required,ValidateUrl]),
                age:new FormControl(null,Validators.compose([Validators.pattern('^[1-9]\\d*$'),Validators.required])),
                gender:new FormControl(null,{validators:[Validators.required]}),
                about:new FormControl(null,{validators:[Validators.required]}),
                dob: new FormControl(null,{validators:[Validators.required]})
              });
      

    //    this.editModeSubs = this.userService.editData.subscribe((data:User)=>{
    //         if(data){
    //             this.editMode=true;
    //             this.fetchedUser = data
    //             this.form = new FormGroup({
    //                 name: new FormControl(data.name, {validators: [Validators.required]}),
    //                 email: new FormControl(data.email, { validators: Validators.compose([Validators.email, Validators.required]) }),
    //                 githubRepo: new FormControl(data.githubRepo, [Validators.required,ValidateUrl]),
    //                 age:new FormControl(data.age,Validators.compose([Validators.pattern('^[1-9]\\d*$'),Validators.required])),
    //                 gender:new FormControl(data.gender,{validators:[Validators.required]}),
    //                 about:new FormControl(data.about,{validators:[Validators.required]}),
    //                 dob: new FormControl(data.dob,{validators:[Validators.required]})
    //               });
    //         }else{
    //             this.editMode = false
    //         }
    //     })
              this.route.params.subscribe((params:Params)=>{
                  if(params.id){
                      this.editMode = true;
                      this.userService.fetchUser(params.id)
                        .subscribe((response)=>{
                            this.fetchedUser = response.data;
                            this.form = new FormGroup({
                                name: new FormControl(this.fetchedUser.name, {validators: [Validators.required]}),
                                email: new FormControl({value:this.fetchedUser.email,disabled:true}, { validators: Validators.compose([Validators.email, Validators.required]) }),
                                githubRepo: new FormControl(this.fetchedUser.githubRepo, [Validators.required,ValidateUrl]),
                                age:new FormControl(this.fetchedUser.age,Validators.compose([Validators.pattern('^[1-9]\\d*$'),Validators.required])),
                                gender:new FormControl(this.fetchedUser.gender,{validators:[Validators.required]}),
                                about:new FormControl(this.fetchedUser.about,{validators:[Validators.required]}),
                                dob: new FormControl(this.fetchedUser.dob,{validators:[Validators.required]})
                              });
                        })
                  }
              })
          
        
    }

    onSubmit(){
        if(this.form.invalid){
            return ;
        }

        if(!this.editMode){
            console.log(this.form.valid)
        console.log(this.form.value)
        this.userService.createUser(this.form.value.name,this.form.value.email,
            this.form.value.githubRepo,this.form.value.age,this.form.value.gender,
            this.form.value.about,this.form.value.dob).subscribe((response)=>{
                console.log(response)
                this.router.navigate(['/'])
            })
        }else{
        console.log(this.form.valid)
        console.log(this.form.value)
        this.userService.updateUser(this.fetchedUser._id,this.form.value.name,this.form.value.email,
            this.form.value.githubRepo,this.form.value.age,this.form.value.gender,
            this.form.value.about,this.form.value.dob)
            .subscribe((response)=>{
                console.log(response)
                this.userService.fetchUsersList()
                this.router.navigate(['/'])
            })
        }
        

    }

    ngOnDestroy(){
        // this.editModeSubs.unsubscribe()
    }
}