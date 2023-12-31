import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ToasterService } from '../services/toaster.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { Token } from '@angular/compiler';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isLogined: boolean = false

  loginForm=this.fb.group({
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-z]*')]]
  })

  constructor(private fb:FormBuilder,private toaster:ToasterService,private api:ApiService,private loginRouter:Router){

  }

  login(){
    if(this.loginForm.valid){
      let acno = this.loginForm.value.acno
      let pswd = this.loginForm.value.pswd
      // make api service call
      this.api.login(acno,pswd).subscribe({
        next:(result:any)=>{
          console.log(result);
          const {loginUser,token} = result
          // store username in local storage
          localStorage.setItem("loginUsername",loginUser.username)
          localStorage.setItem("loginUserAcno",loginUser.acno)

          localStorage.setItem("token",token)

          this.isLogined=true
          setTimeout(() => {
            this.isLogined=false
            this.toaster.showSuccess(`welcome '${loginUser.username}'`,"success")
            this.loginRouter.navigateByUrl("user/dashboard")
            
          },2000);
          
          
        },
        error:(result:any)=>{
          console.log(result.error);
          this.toaster.showError(result.error,"Error")
          setTimeout(() => {
            this.loginForm.reset()
            
          }, 3000);
          

        }
      })
    }
    else{
      this.toaster.showWarning("invalid","warning")

    }

  }


}
