import { Component, computed, HostListener, inject, NgZone, OnInit, signal } from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import Lenis from 'lenis';
import { Signup } from './auth/signup/signup';
import { filter } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone:true,
  imports: [RouterOutlet, Navbar],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App implements OnInit {
  protected readonly title = signal('HotelBooking');
  private ngZone = inject(NgZone);
  hideUi = false;

  constructor(private router :Router){
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      const url = event.urlAfterRedirects;
      this.hideUi = url.includes('login') || url.includes('signup');
    });
  }
ngOnInit() {
    this.ngZone.runOutsideAngular(() => {
      const lenis = new Lenis({
        duration: 1.0,
        lerp: 0.10,
        wheelMultiplier: 0.9,
        infinite: false,
        gestureOrientation: 'vertical',
      });

      const raf = (time: number) => {
        lenis.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);
    });
  }

  showButton = false;

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.showButton = window.scrollY > 300;
  }

  scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
