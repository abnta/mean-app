import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../Auth/auth.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit , OnDestroy {

  constructor(private authService:AuthService,private router:Router) { }
  isAuthenticated:boolean = this.authService.authenticated;
  authSubs:Subscription;
  ngOnInit() {
   this.authSubs = this.authService.isAuthenticated.subscribe((data:boolean)=>{
      this.isAuthenticated = data
    })
  }
  onLogout(){
    this.authService.logout();
    this.router.navigate(['/'])
  }

  ngOnDestroy(){
    this.authSubs.unsubscribe()
  }

}
