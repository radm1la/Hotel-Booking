import { Component, computed, HostListener, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-hero-component-hotels',
  imports: [],
  templateUrl: './hero-component-hotels.html',
  styleUrl: './hero-component-hotels.css',
})
export class HeroComponentHotels implements OnInit {
  scrollY = signal(0);

  ngOnInit(): void {
    this.scrollY.set(window.scrollY);
  }

  heroTransform = computed(() => `translate3d(0, ${this.scrollY() * 0.4}px, 0)`);
  textTransform = computed(() => `translate3d(0, ${this.scrollY() * 0.1}px, 0)`);

  @HostListener('window:scroll',[])
  onWindowScroll(){
    this.scrollY.set(window.scrollY);
  }

}
