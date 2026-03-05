import { Component } from '@angular/core';
import { HeroRoomDetail } from "./hero-room-detail/hero-room-detail";

@Component({
  selector: 'app-room-detail',
  imports: [HeroRoomDetail],
  templateUrl: './room-detail.html',
  styleUrl: './room-detail.css',
})
export class RoomDetail {

}
