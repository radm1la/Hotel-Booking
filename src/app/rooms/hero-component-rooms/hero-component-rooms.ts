import { Component, computed, HostListener, signal } from '@angular/core';

@Component({
  selector: 'app-hero-component-rooms',
  imports: [],
  templateUrl: './hero-component-rooms.html',
  styleUrl: './hero-component-rooms.css',
})
export class HeroComponentRooms {
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
