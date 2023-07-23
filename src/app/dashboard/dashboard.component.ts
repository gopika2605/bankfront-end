import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  user:string=""
  isReadMore:boolean=true
  balanceSuccessStatus:boolean = false
  balance:number = 0
  // fund Transfer
  transferForm =  this.fb.group({
    creditacno:['',[Validators.required,Validators.pattern('[0-9]*')]],
    amount:['',[Validators.required,Validators.pattern('[0-9]*')]]
  })
  constructor(private api:ApiService,private toaster:ToasterService,private fb:FormBuilder,private dashboardrouter:Router ){}

  ngOnInit(): void {
    if(localStorage.getItem("loginUsername")){
     this.user= localStorage.getItem("loginUsername")|| ""
    }
}
toggle(){
  this.isReadMore = !this.isReadMore

}
  getbalance(){
    // make api call
    // get loginUSerAcno from local storage
    const acno = localStorage.getItem("loginUserAcno")
    this.api.getbalance(acno).subscribe({
      next:(output:any)=>{
        this.balanceSuccessStatus=true
        this.balance = output
      },
      
      error:(err:any)=>{
        this.balanceSuccessStatus=false
        this.toaster.showWarning(err.error,"warning")
      }
      
    })

  }
  transfer(){
    if(this.transferForm.valid){
      let creditacno = this.transferForm.value.creditacno
      let amount = this.transferForm.value.amount
      this.api.fundtransfer(creditacno,amount).subscribe({
        next:(response:any)=>{
          this.toaster.showSuccess(response,"Success")
        },
        error:(err:any)=>{
          this.toaster.showError(err.error,"Failed")
        }
      })

    }else{
      this.toaster.showWarning("Invalid form","warning")
    }
  }
  


  deleteAccount(){
    this.api.deleteAcno().subscribe({
      next:(response:any)=>{
        
        this.toaster.showSuccess(response,"success");
        this.logout();
      },
      error:(err:any)=>{
        this.toaster.showError(err.message,"Error")
      }

    })
  }


  logout(){
    localStorage.removeItem("token")
        localStorage.removeItem("loginUsername")
        localStorage.removeItem("loginUserAcno")
        setTimeout(() => {
          this.dashboardrouter.navigateByUrl('')
          
        }, 2000);
  }
}
