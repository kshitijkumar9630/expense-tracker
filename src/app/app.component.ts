import { Component } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

import {CrudService} from './services/crud.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Expense Tracker';

  card_data: any;
  card_title:string;
  amount:any;
  note:string;
  date:string;
  message:string;
  sum:any;

  constructor(public crudservice:CrudService, private snackBar:MatSnackBar){}
  
  ngOnInit(){
  this. FetchData()
  }

  FetchData(){
    this.crudservice.get_all_data().subscribe(data=>{
      this.card_data =data.map(e=>{
        return{
          id:e.payload.doc.id,
          isedit:false,
          title:e.payload.doc.data()['title'],
          amount:e.payload.doc.data()['amount'],
          note:e.payload.doc.data()['note'],
          date:e.payload.doc.data()['date']
        }; 
      })
      //console.log(this.card_data)
      //console.log(this.card_data[0].amount);
      this.TotalAmount()
    })
  }

  CreateCard()
  {
    let Record = {};
    Record['title'] = this.card_title;
    Record['amount'] = this.amount;
    Record['note'] = this.note;
    Record['date'] = this.date;

    this.crudservice.create_new_data(Record).then(res => {

        this.card_title = "";
        this.amount = undefined;
        this.note ="";
        this.date ="";
        console.log(res);
        this.message = "Expense added";
        this.snackBar.open(this.message)
    }).catch(error => {
      console.log(error);
    });
  }

  EditRecord(Record)
  {
    Record.isedit = true;
    Record.edittitle = Record.title;
    Record.editamount = Record.amount;
    Record.editnote = Record.note;
    Record.editdate= Record.date;
  }

  UpdateRecord(record_data)
  {
    let record = {};
    record['title'] = record_data.edittitle;
    record['amount'] = record_data.editamount;
    record['note'] = record_data.editnote;
    record['date'] = record_data.editdate;
    this.crudservice.update_data(record_data.id, record);
    record_data.isedit = false;
  }

  DeleteRecord(record_id)
  {
    this.crudservice.delete_data(record_id);
  }
  
  TotalAmount()
  {
    this.sum = this.card_data.map(o => o.amount).reduce((a, c) => { return a + c });
    console.log(this.sum);
  }
  
}

