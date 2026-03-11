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

  heroTransform = computed(() => {
    if (window.innerWidth < 768) return 'translate3d(0, 0, 0)';
    return `translate3d(0, ${this.scrollY() * 0.4}px, 0)`;
  });
  textTransform = computed(() => {
    if (window.innerWidth < 768) return 'translate3d(0, 0, 0)';
    return `translate3d(0, ${this.scrollY() * 0.1}px, 0)`;
  });

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollY.set(window.scrollY);
  }
}
