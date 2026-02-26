import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-infinite-carousel-component',
  imports: [],
  templateUrl: './infinite-carousel-component.html',
  styleUrl: './infinite-carousel-component.css',
})
export class InfiniteCarouselComponent {
  @Input() text: string = "GeoNest";
}
