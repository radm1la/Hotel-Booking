import { AfterViewInit, Component, ElementRef, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-values-rooms-comp',
  imports: [],
  templateUrl: './values-rooms-comp.html',
  styleUrl: './values-rooms-comp.css',
})
export class ValuesRoomsComp implements AfterViewInit{
    @ViewChild('revealElem') revealElem! : ElementRef;

    constructor(private renderer:Renderer2){}

    ngAfterViewInit(){
      const observer = new IntersectionObserver((entries)=>{
      entries.forEach((entry)=>{
        if(entry.isIntersecting){
          this.renderer.addClass(this.revealElem.nativeElement,'reveal-visible');
          this.renderer.removeClass(this.revealElem.nativeElement, 'reveal-hidden');
        }else{
          this.renderer.removeClass(this.revealElem.nativeElement, 'reveal-visible');
        this.renderer.addClass(this.revealElem.nativeElement, 'reveal-hidden');
        }
      });
    },{
      threshold:0.5
    })

    observer.observe(this.revealElem.nativeElement);
    }
}
