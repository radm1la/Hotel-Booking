import { Component, computed, HostListener, OnInit, signal } from '@angular/core';
import { Helper } from '../../helper';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-hero-room-detail',
  imports: [],
  templateUrl: './hero-room-detail.html',
  styleUrl: './hero-room-detail.css',
})
export class HeroRoomDetail implements OnInit {
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
