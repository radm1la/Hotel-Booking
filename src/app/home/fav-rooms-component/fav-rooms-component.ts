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

  isLoading = true;
  dataLoaded:boolean = false;
  errorMsg ="";

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
      threshold:0.9
    })

    observer.observe(this.revealElem.nativeElement);
  }

  //--
  favRooms = signal<any>([]);
  fetchFavRooms(){
    this.isLoading = true;
    this.service.getAllRooms().subscribe({
      next:(data)=>{
        this.favRooms.set(data.slice(0,6));
        this.dataLoaded = true;
        this.isLoading = false;
        this.errorMsg = "";
      },
      error:(badData)=>{
        this.isLoading = false;
        this.dataLoaded = false;
        this.errorMsg = "We're having trouble reaching the server. Please try again later.";
        console.log("Error loading rooms. ",badData);
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
