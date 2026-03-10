import { Component, signal } from '@angular/core';
import { Helper } from '../helper';
import { DatePipe } from '@angular/common';
import { forkJoin, map, switchMap } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-my-booking',
  imports: [DatePipe],
  templateUrl: './my-booking.html',
  styleUrl: './my-booking.css',
})
export class MyBooking {
  isLocalLoading = signal(true);
  constructor(public service: Helper,private router:Router) {
    this.fetchBooking();
    this.fetchUser();
  }
  booking = signal<any>([]);
  userInfo = signal<any>({});

  fetchBooking() {
    this.isLocalLoading.set(true);
    const currentUserId = localStorage.getItem('user_id');

    this.service.getBooking().subscribe((data: any) => {
      const myBookings = data.filter((i: any) => i.customerId === currentUserId);
      
      
      if (myBookings.length === 0) {
        this.booking.set([]);
        this.isLocalLoading.set(false);
        return;
      }

      const roomReqs = myBookings.map((b:any)=>{
        return this.service.getRoomById(b.roomID).pipe(
          switchMap((roomDetails:any)=>
            this.service.getHotelById(roomDetails.hotelId).pipe(
              map((hotelDetails:any)=>({
                ...b,
                roomDetails,
                hotelDetails
              }))
            )
          )
        )
      })

      forkJoin(roomReqs).subscribe({
        next: (data) => {
          console.log('Final Combined Data:', data);
          this.booking.set(data);
          this.isLocalLoading.set(false);
        },
        error:(err)=>{
          console.error("Error fetching room details", err);
          this.isLocalLoading.set(false);
        }
      })
    });
  }

  fetchUser(){
    this.service.getUser().subscribe({
      next:(data)=>{
        this.userInfo.set(data);
      },
      error:(err)=>{
        console.log("Error loading user info",err);
      }
    })
  }

  deleteAcc(){
    this.service.deleteAccount().subscribe({
      next:(data)=>{
        console.log(data);
        this.router.navigate(["/"]);
      },
      error:(err)=>{
        console.log("Erro deleting user account",err);
      }
    })
  }

  cancel(id:number){
    this.service.cancelBooking(id).subscribe({
      next:(data)=>{
        console.log(data);
        this.fetchBooking();
      },error:(err)=>{
        console.log("Error calceling booking",err);
        
      }

    })
  }
}
