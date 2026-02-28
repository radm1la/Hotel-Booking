import { Component, OnInit, signal } from '@angular/core';
import { Helper } from '../../helper';

@Component({
  selector: 'app-hotels-list-component',
  imports: [],
  templateUrl: './hotels-list-component.html',
  styleUrl: './hotels-list-component.css',
})
export class HotelsListComponent implements OnInit {
  city = signal<string>('');
  hotels = signal<any>([]);

  constructor(private service: Helper) {}

  ngOnInit() {
    this.fetchHotels('all');
    this.getCityName();
  }

  getCityName() {
    this.service.cityName.subscribe({
      next: (cityN) => {
        this.city.set(cityN);
        this.fetchHotels(cityN);
      },
      error: (bad) => {
        console.log('Error getting city name. ', bad);
      },
    });
  }

  fetchHotels(cityName:string) {
    if(cityName === 'all'){
      this.service.getAllHotels().subscribe({
        next:(data)=>{
          console.log(data);
          this.hotels.set(data);
        },
        error:(bad)=>{
          console.log("Error loading hotels. ",bad);
        }
      })
    }else{
      this.service.getHotelsByCity(cityName).subscribe({
        next:(data)=>{
          console.log(data);
          this.hotels.set(data);
        },
        error:(bad)=>{
          console.log("Error loading hotels. ",bad);
        }
      })
    }
  }
}
