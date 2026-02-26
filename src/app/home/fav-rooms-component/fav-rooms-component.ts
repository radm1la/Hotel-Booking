import { AfterViewInit, Component, ElementRef, Renderer2, signal, ViewChild, viewChild } from '@angular/core';
import { Helper } from '../../helper';

@Component({
  selector: 'app-fav-rooms-component',
  imports: [],
  templateUrl: './fav-rooms-component.html',
  styleUrl: './fav-rooms-component.css',
})
export class FavRoomsComponent implements AfterViewInit {
  @ViewChild('revealElem') revealElem! : ElementRef;
  randomImgIndex = Math.floor(Math.random()*6)

  constructor(private renderer:Renderer2,private service:Helper){
    this.fetchFavRooms();
  }

  ngAfterViewInit() {
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
      threshold:0.1
    })

    observer.observe(this.revealElem.nativeElement);
  }

  //--
  favRooms = signal<any>([]);
  fetchFavRooms(){
    this.service.getAllRooms().subscribe({
      next:(data)=>{
        console.log(data);
        
        this.favRooms.set(data.slice(0,6));
      }
    })
  }

  currentIndex = signal(0);
  goToSlide(i:number){
    this.currentIndex.set(i);
  } 
  getTransform(){
    return `translateX(-${this.currentIndex() * 470}px)`;
  }

  next() {
    if (this.currentIndex() < this.favRooms().length - 3) {
      this.currentIndex.update(v => v + 1);
    }
  }

  prev() {
    if (this.currentIndex() > 0) {
      this.currentIndex.update(v => v - 1);
    }
  }
}
