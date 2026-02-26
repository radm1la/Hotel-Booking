import { Component } from '@angular/core';
import { HeroComponent } from "./hero-component/hero-component";
import { Values } from "./values/values";
import { FavRoomsComponent } from "./fav-rooms-component/fav-rooms-component";
import { InfiniteCarouselComponent } from "./infinite-carousel-component/infinite-carousel-component";

@Component({
  selector: 'app-home',
  imports: [HeroComponent, Values, FavRoomsComponent, InfiniteCarouselComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
