import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  base_url:string = " http://localhost:3000"

  constructor(private http:HttpClient) { }

  // register
  register(username:any,acno:any,password:any){
    const body ={
      username,acno,password
    }
    // api call to http://localhost:3000/register
    return this.http.post(`${this.base_url}/register`,body)
  }

  // login
  login(acno:any,password:any){
    const body ={
      acno,password
    }
    // api call to http://localhost:3000/register
    return this.http.post(`${this.base_url}/login`,body)
  }

  // appendToken

  appendToken(){
    // get token from local storage
    const token = localStorage.getItem("token")
    // create http request header
    let headers = new HttpHeaders()

    if(token){
      headers= headers.append("access-token",token)
    }
    return {headers}
  }
  

  // getbalance

  getbalance(acno:any){
    // api call
    return this.http.get(`${this.base_url}/get-balance/${acno}`,this.appendToken())
  }

  fundtransfer(creditAcno:any,amount:any){
    const body={
      creditAcno,amount
    }
    return this.http.post(`${this.base_url}/fund-transfer`,body,this.appendToken())



  }

  transactions(){
    return this.http.get(`${this.base_url}/get-transaction`,this.appendToken())

  }

  deleteAcno(){

    return this.http.delete(`${this.base_url}/delete-my-account`,this.appendToken())

  }

  
}
