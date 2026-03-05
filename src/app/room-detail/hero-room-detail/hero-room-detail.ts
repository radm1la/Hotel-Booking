import { Component, input } from '@angular/core';

@Component({
  selector: 'app-hero-room-detail',
  imports: [],
  templateUrl: './hero-room-detail.html',
  styleUrl: './hero-room-detail.css',
})
export class HeroRoomDetail{
  roomInfo = input<any>();
  randomIndex = input<number>(0);
}
