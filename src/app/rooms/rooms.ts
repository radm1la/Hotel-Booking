import { Component, OnInit, signal } from '@angular/core';
import { Helper } from '../helper';
import { ActivatedRoute } from '@angular/router';
import { HeroComponentRooms } from "./hero-component-rooms/hero-component-rooms";
import { ValuesRoomsComp } from "./values-rooms-comp/values-rooms-comp";
import { FilteringComponent } from "./filtering-component/filtering-component";
import { CardsComponent } from "./cards-component/cards-component";

@Component({
  selector: 'app-rooms',
  imports: [HeroComponentRooms, ValuesRoomsComp, FilteringComponent, CardsComponent],
  templateUrl: './rooms.html',
  styleUrl: './rooms.css',
})
export class Rooms implements OnInit {
  rooms = signal<any>([]);

  constructor(
    public service: Helper,
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
          this.rooms.set(data);
        }
      });
    } else {
      this.service.getHotelById(id).subscribe({
        next: (data:any) => {
          this.rooms.set(data.rooms);
        },
        error: (bad) => {
          console.log("Error loading hotel's info", bad);
        },
      });
    }
  }
}
