import { Component } from '@angular/core';
import { HeroComponentHotels } from "./hero-component-hotels/hero-component-hotels";
import { Cities } from "./cities/cities";

@Component({
  selector: 'app-hotels',
  imports: [HeroComponentHotels, Cities],
  templateUrl: './hotels.html',
  styleUrl: './hotels.css',
})
export class Hotels {

}
