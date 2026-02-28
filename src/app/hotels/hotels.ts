import { Component } from '@angular/core';
import { HeroComponentHotels } from "./hero-component-hotels/hero-component-hotels";
import { Cities } from "./cities/cities";
import { HotelsListComponent } from "./hotels-list-component/hotels-list-component";

@Component({
  selector: 'app-hotels',
  imports: [HeroComponentHotels, Cities, HotelsListComponent],
  templateUrl: './hotels.html',
  styleUrl: './hotels.css',
})
export class Hotels {

}
