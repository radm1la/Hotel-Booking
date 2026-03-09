import { Component, signal } from '@angular/core';
import { Description } from "./description/description";
import { Helper } from '../helper';
import { ActivatedRoute } from '@angular/router';
import { HeroRoomDetail } from './hero-room-detail/hero-room-detail';
import { BookRoom } from "./book-room/book-room";

@Component({
  selector: 'app-room-detail',
  imports: [HeroRoomDetail, Description, BookRoom],
  templateUrl: './room-detail.html',
  styleUrl: './room-detail.css',
})
export class RoomDetail {
  roomInfo = signal<any>({});
  randomIndex = 0;
  constructor(
    public service: Helper,
    private route: ActivatedRoute,
  ) {}

  ngOnInit(): void {
    this.fetchRoom();
  }

  fetchRoom() {
    const id = Number(this.route.snapshot.paramMap.get('roomId'));
    this.service.getRoomById(id).subscribe({
      next: (data: any) => {
        console.log(data);
        this.randomIndex = Math.floor(Math.random() * data.images.length);
        this.roomInfo.set(data);
      },
    });
  }

  getRandomIndex() {}
}
