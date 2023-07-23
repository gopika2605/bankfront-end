import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms'
import { ToasterService } from '../services/toaster.service';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  registerForm = this.fb.group({

    username:['',[Validators.required,Validators.pattern('[a-zA-z]*'),Validators.minLength(2)]],
    acno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    pswd:['',[Validators.required,Validators.pattern('[0-9a-zA-z]*')]]

  })
  

  constructor(private fb:FormBuilder,private toaster:ToasterService,private api:ApiService,
    private registerRouter:Router){}

  register(){
    // this.registerForm.get('username')?.errors
    if(this.registerForm.valid){
      
    
    // get user input
    let username= this.registerForm.value.username
    let acno = this.registerForm.value.acno
    let pswd = this.registerForm.value.pswd
    // make api sevice call
    this.api.register(username,acno,pswd).subscribe({
      next:(res:any)=>{
        console.log(res);
        this.toaster.showSuccess(`${res.username} registered successfully`,"success")
       setTimeout(()=>{
         // navigate too login
         this.registerRouter.navigateByUrl("user/login")
        

       },3000);
      },
      error:(err:any)=>{
        console.log(err);
        this.toaster.showError(`${err.error} `,"Failed")
        setTimeout(()=>{
          this.registerForm.reset()
        },3000)
        
      }

    })
  }else{
    this.toaster.showWarning("invalid","warning")

  }

}

}
