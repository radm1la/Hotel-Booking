import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-go-to-rooms-comp',
  imports: [RouterLink],
  templateUrl: './go-to-rooms-comp.html',
  styleUrl: './go-to-rooms-comp.css',
  standalone: true,
})
export class GoToRoomsComp implements AfterViewInit {
  @ViewChild('textElem') textElem!: ElementRef;

  scrollY = signal(0);

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.scrollY.set(window.scrollY);
  }

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.renderer.addClass(entry.target, 'reveal-visible');
            this.renderer.removeClass(entry.target, 'reveal-hidden');
          } else {
            this.renderer.removeClass(entry.target, 'reveal-visible');
            this.renderer.addClass(entry.target, 'reveal-hidden');
          }
        });
      },
      {
        threshold: 0.5,
      },
    );

    if (this.textElem) {
      observer.observe(this.textElem.nativeElement);
    }
  }

  getOffset() {
    if (!this.textElem) return 0;

    const rect = this.textElem.nativeElement.getBoundingClientRect();
    const viewportCenter = window.innerHeight / 2;
    const elementCenter = rect.top + rect.height / 2;

    return elementCenter - viewportCenter;
  }

  getParaOne() {
    const offset = this.getOffset() * 0.05;
    return `translate3d(0, ${offset}px, 0)`;
  }

  getParaTwo() {
    const offset = this.getOffset() * -0.1;
    return `translate3d(0, ${offset}px, 0)`;
  }
}
