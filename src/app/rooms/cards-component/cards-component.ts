import { AfterViewInit, Component, computed, ElementRef, input, signal, ViewChild } from '@angular/core';

@Component({
  selector: 'app-cards-component',
  imports: [],
  templateUrl: './cards-component.html',
  styleUrl: './cards-component.css',
})
export class CardsComponent implements AfterViewInit{
  roomsList = input<any>([]);
  randomImgIndex = Math.floor(Math.random() * 6);

  limit = signal(4);
  @ViewChild('anchor') anchor!: ElementRef;

  visibleRooms =  computed(()=>{
    return this.roomsList().slice(0,this.limit());
  })

  ngAfterViewInit(): void {
    const observer = new IntersectionObserver((entries)=>{
      if(entries[0].isIntersecting && this.limit() < this.roomsList().length){
        this.limit.update(n => n+2);
      }
    }, {threshold: 0.2}
  )

  observer.observe(this.anchor.nativeElement);
  }
}


