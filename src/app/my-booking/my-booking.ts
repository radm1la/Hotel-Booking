import { Component, signal } from '@angular/core';
import { Helper } from '../helper';
import { DatePipe } from '@angular/common';
import { forkJoin, map, switchMap } from 'rxjs';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-my-booking',
  imports: [DatePipe],
  templateUrl: './my-booking.html',
  styleUrl: './my-booking.css',
})
export class MyBooking {
  isLocalLoading = signal(true);
  isDeleting = signal<number[]>([]);
  booking = signal<any>([]);
  userInfo = signal<any>({});

  constructor(
    public service: Helper,
    private router: Router,
    private cookie:CookieService
  ) {
    this.fetchBooking();
    this.fetchUser();
  }

  fetchBooking() {
    this.isLocalLoading.set(true);
    const currentUserId = localStorage.getItem('user_id');

    this.service.getBooking().subscribe((data: any) => {
      const myBookings = data.filter((i: any) => i.customerId === currentUserId);
      console.log(myBookings);

      if (myBookings.length === 0) {
        this.booking.set([]);
        this.isLocalLoading.set(false);
        return;
      }

      const roomReqs = myBookings.map((b: any) => {
        return this.service.getRoomById(b.roomID).pipe(
          switchMap((roomDetails: any) =>
            this.service.getHotelById(roomDetails.hotelId).pipe(
              map((hotelDetails: any) => ({
                ...b,
                roomDetails,
                hotelDetails,
              })),
            ),
          ),
        );
      });

      forkJoin(roomReqs).subscribe({
        next: (data) => {
          console.log('Final Combined Data:', data);
          this.booking.set(data);
          this.isLocalLoading.set(false);
        },
        error: (err) => {
          console.error('Error fetching room details', err);
          this.isLocalLoading.set(false);
        },
      });
    });
  }

  fetchUser() {
    this.service.getUser().subscribe({
      next: (data) => {
        this.userInfo.set(data);
      },
      error: (err) => {
        console.log('Error loading user info', err);
      },
    });
  }

  deleteAcc() {
    this.service.deleteAccount().subscribe({
      next: (data) => {
        console.log(data);
        this.cookie.delete("user_token");
        localStorage.removeItem("user_id");
        this.service.isLogged.next(false);
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.log('Erro deleting user account', err);
      },
    });
  }

  cancel(id: number) {
    this.isDeleting.update((ids) => [...ids, id]);
    this.service.cancelBooking(id).subscribe({
      next: (data) => {
        this.booking.update((current) => current.filter((b: any) => b.id !== id));
        this.isDeleting.update((ids) => ids.filter((itemId) => itemId !== id));
      },
      error: (err) => {
        console.log('Error calceling booking', err);
        this.isDeleting.update((ids) => ids.filter((itemId) => itemId !== id));
        alert('Could not cancel this reservation. Please try again.');
      },
    });
  }
}
