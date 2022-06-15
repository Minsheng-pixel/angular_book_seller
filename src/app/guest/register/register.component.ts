import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { User } from 'src/app/models/user.model';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  user:User = new User();
  faUser = faUserCircle;
  errorMessage:string= "";
  //num:number =0;
  constructor(private authenticationService:AuthenticationService,private router:Router) { }

  ngOnInit(): void {
    if(this.authenticationService.currentUserValue?.id){
      this.router.navigate(['/profile']);
      return;
    }
    //this.num= this.num+1;
  }
  register(){
    this.authenticationService.register(this.user).subscribe({
      next:(data) =>{
      this.router.navigate(['/login']);
    },
      error:(err)=>{
        if (err?.status===409){
          this.errorMessage = 'Username already exist.';
        }else{
          this.errorMessage ="unexpected error occur. Error is "+err?.errorMessage;
          console.log(err);
        }
      }
  });

  }

}
