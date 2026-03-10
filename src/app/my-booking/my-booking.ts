import { Component, signal } from '@angular/core';
import { Helper } from '../helper';

@Component({
  selector: 'app-my-booking',
  imports: [],
  templateUrl: './my-booking.html',
  styleUrl: './my-booking.css',
})
export class MyBooking {
  isLocalLoading = signal(true);
  constructor(public service: Helper) {
    this.fetchBooking();
  }
  booking = signal<any>([]);

  fetchBooking() {
    this.isLocalLoading.set(true);
    const currentUserId = localStorage.getItem('user_id');
    this.service.getBooking().subscribe((data: any) => {
      const myBookings = data.filter((i: any) => i.customerId === currentUserId);
      this.booking.set(myBookings);
      this.isLocalLoading.set(false);
      console.log(myBookings);
    });
  }
}
