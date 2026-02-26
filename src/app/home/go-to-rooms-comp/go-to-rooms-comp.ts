import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-go-to-rooms-comp',
  imports: [],
  templateUrl: './go-to-rooms-comp.html',
  styleUrl: './go-to-rooms-comp.css',
})
export class GoToRoomsComp implements AfterViewInit {
  @ViewChild('textElem') textElem!: ElementRef;

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          this.renderer.addClass(entry.target, 'reveal-visible');
          this.renderer.removeClass(entry.target, 'reveal-hidden');
        } else {
          this.renderer.removeClass(entry.target, 'reveal-visible');
          this.renderer.addClass(entry.target, 'reveal-hidden');
        }
      });
    },{
      threshold:0.5
    }
  );

  if(this.textElem){
    observer.observe(this.textElem.nativeElement);
  }

  }
}
