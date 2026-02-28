import { Component, OnInit, signal } from '@angular/core';
import { Helper } from '../helper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-rooms',
  imports: [],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
})
export class Rooms implements OnInit {
  rooms = signal<any>([]);

  constructor(
    private service: Helper,
    private route: ActivatedRoute,
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('hotelId')) || -1;
    this.fetchRooms(id);
  }

  fetchRooms(id: number) {
    if (id === -1) {
      this.service.getAllRooms().subscribe({
        next: (data:any) => {
          console.log(data);
          this.rooms.set(data);
        },
        error: (bad) => {
          console.log('Error loading all rooms. ', bad);
        },
      });
    } else {
      this.service.getHotelById(id).subscribe({
        next: (data:any) => {
          console.log(data.rooms);
          this.rooms.set(data.rooms);
        },
        error: (bad) => {
          console.log("Error loading hotel's info", bad);
        },
      });
    }
  }
}
