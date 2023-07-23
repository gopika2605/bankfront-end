import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import jspdf from 'jspdf'
import autoTable from 'jspdf-autotable'


@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit{
  allTransactions:any=[]
  searchkey:string=""

  constructor(private api:ApiService ,private toaster:ToasterService){

  }

  ngOnInit(): void {
      this.api.transactions().subscribe({
        next:(response:any)=>{
          this.allTransactions = response
          console.log(this.allTransactions);
          
        },
        error:(err:any)=>{
          this.toaster.showError(err.error,"Fail")
        }
      })
  }

  generatePDF(){
    let pdf = new jspdf()
    // let title_row = ['Type','Debit Account','Credit Account','Amount']
    // let table_body:any=[]
    // pdf.setFontSize(16)
    // pdf.text("Mini Statement",10,10)
    // pdf.setFontSize(12)
    // for(let element of this.allTransactions){
    //   var temp =[element.transaction_type,element.fromAcno,element.toAcno,element.amount]
    //   table_body.push(temp)

    // }
    // autoTable(pdf,{
    //   head:[title_row],
    //   body:table_body
    // })
    autoTable(pdf, { html: '#my-table' })
    pdf.output('dataurlnewwindow')
    pdf.save('ministatement.pdf')
  }



}
