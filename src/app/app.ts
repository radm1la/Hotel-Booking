import { Component, inject, NgZone, OnInit, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from "./navbar/navbar";
import Lenis from 'lenis';

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
}
