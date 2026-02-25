import { Component } from '@angular/core';
import { HeroComponent } from "./hero-component/hero-component";
import { Values } from "./values/values";

@Component({
  selector: 'app-home',
  imports: [HeroComponent, Values],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

}
