import { ChangeDetectorRef, Component, inject, input, OnInit, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Helper } from '../../helper';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-room',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './book-room.html',
  styleUrl: './book-room.css',
})
export class BookRoom implements OnInit {
  roomInfo = input<any>();
  today = new Date().toISOString().split('T')[0];
  private cdr = inject(ChangeDetectorRef);
  errorMessage = '';
  islogged = false;

  totalPrice = signal(0);

  bookingForm = new FormGroup({
    checkInDate: new FormControl('', [Validators.required]),
    checkOutDate: new FormControl('', [Validators.required]),
    customerName: new FormControl('', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(20),
    ]),
    customerPhone: new FormControl('+995', [
      Validators.required,
      Validators.pattern(/^\+995\d{9}$/),
    ]),
  });

  constructor(private service: Helper) {
    this.bookingForm.valueChanges.subscribe(() => {
      this.errorMessage = '';
      this.cdr.detectChanges();
    });
  }

  ngOnInit() {
    this.bookingForm.valueChanges.subscribe(() => this.calculatePrice());
    this.service.isLogged.subscribe((st) => {
      this.islogged = st;
      this.cdr.detectChanges();
    });
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
    this.errorMessage = '';
    if (this.bookingForm.valid) {
      const payload = {
        ...this.bookingForm.value,
        roomID: this.roomInfo().id,
        totalPrice: this.totalPrice(),
        isConfirmed: true,
        customerId: localStorage.getItem('user_id'),
      };

      this.service.postBooking(payload).subscribe({
        next: (res: any) => {          
          this.errorMessage = 'Room booked successfully!';
          console.log(this.errorMessage);
          this.cdr.detectChanges();
        },
        error: (err: any) => {
          console.log(err);
          
          if (err.status == 400) {
            this.errorMessage = err.error;
            this.cdr.detectChanges();
          }
        },
      });
    }
  }

  hasError(controlName: string, errorType: string): boolean {
    const control = this.bookingForm.get(controlName);
    return !!(
      control?.invalid &&
      (control?.dirty || control?.touched) &&
      control?.hasError(errorType)
    );
  }
}
