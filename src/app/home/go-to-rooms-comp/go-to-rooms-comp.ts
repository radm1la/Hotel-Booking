import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  HostListener,
  OnInit,
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
export class GoToRoomsComp implements AfterViewInit, OnInit {
  @ViewChild('textElem') textElem!: ElementRef;

  scrollY = signal(0);

  ngOnInit(): void {
    this.scrollY.set(window.scrollY)
  }

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

  paraOneTransform = computed(() => {
    const relativeScroll = this.scrollY() - 1200; 
    return `translate3d(0, ${relativeScroll * 0.05}px, 0)`;
  });

  paraTwoTransform = computed(() => {
    const relativeScroll = this.scrollY() - 1200;
    return `translate3d(0, ${relativeScroll * -0.1}px, 0)`;
  });
}
