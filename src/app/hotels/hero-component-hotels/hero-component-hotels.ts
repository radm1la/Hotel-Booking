import { Component, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-hero-component-hotels',
  imports: [],
  templateUrl: './hero-component-hotels.html',
  styleUrl: './hero-component-hotels.css',
})
export class HeroComponentHotels {
  scrollY = signal(0);

  @HostListener('window:scroll',[])
  onWindowScroll(){
    this.scrollY.set(window.screenY);
  }

  getHeroTransform(){
    return `translate3d(0,${this.scrollY()*0.4}px,0)`;
  }

  getTextTransform(){
    return `translate3d(0, ${this.scrollY() * 0.1}px, 0)`;
  }
}
