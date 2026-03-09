import { Component, signal } from '@angular/core';
import { Helper } from '../helper';

@Component({
  selector: 'app-my-booking',
  imports: [],
  templateUrl: './my-booking.html',
  styleUrl: './my-booking.css',
})
export class MyBooking {
  constructor(private service:Helper){
    this.fetchBooking();
  }
  booking = signal<any>([]);

  fetchBooking(){
    this.service.getBooking().subscribe((data:any)=>{
      console.log(data);
      
       data.forEach((i:any)=>{        
        if(i.customerId == localStorage.getItem("user_id")){
          console.log(i);
        }
       })
    })
  }
}
