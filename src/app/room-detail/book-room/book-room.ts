import { Component, input, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Helper } from '../../helper';
import { DecimalPipe } from '@angular/common';

@Component({
  selector: 'app-book-room',
  imports: [ReactiveFormsModule,DecimalPipe],
  templateUrl: './book-room.html',
  styleUrl: './book-room.css',
})
export class BookRoom {
  roomInfo = input<any>();

  bookedDatesSet = new Set<string>();
  totalPrice = signal(0);

  bookingForm = new FormGroup({
    checkInDate: new FormControl('', [Validators.required]),
    checkOutDate: new FormControl('', [Validators.required]),
    customerName: new FormControl('', [Validators.required]),
    customerPhone: new FormControl('', [Validators.required])
  });

  constructor(private service: Helper) {}

  ngOnInit() {
    // Convert booked dates to simple YYYY-MM-DD strings for quick lookup
    this.roomInfo().bookedDates.forEach((d: any) => {
      this.bookedDatesSet.add(d.date.split('T')[0]);
    });

    // Recalculate price when dates change
    this.bookingForm.valueChanges.subscribe(() => this.calculatePrice());
  }

  calculatePrice() {
    const start = this.bookingForm.value.checkInDate;
    const end = this.bookingForm.value.checkOutDate;
    
    if (start && end) {
      const days = (new Date(end).getTime() - new Date(start).getTime()) / (1000 * 3600 * 24);
      if (days > 0) {
        this.totalPrice.set(days * this.roomInfo().pricePerNight);
      }
    }
  }

  submitBooking() {
    if (this.bookingForm.valid) {
      const payload = {
        ...this.bookingForm.value,
        roomID: this.roomInfo().id,
        totalPrice: this.totalPrice(),
        isConfirmed: true,
        customerId: localStorage.getItem('user_id') // Assuming you saved this at login
      };

      this.service.postBooking(payload).subscribe({
        next: (res:any) => alert('Booking Successful!'),
        error: (err:any) => console.error(err)
      });
    }
  }
}
