import { Component, OnInit, signal } from '@angular/core';
import { Helper } from '../../helper';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-hotels-list-component',
  imports: [RouterLink],
  templateUrl: './hotels-list-component.html',
  styleUrl: './hotels-list-component.css',
})
export class HotelsListComponent implements OnInit {
  city = signal<string>('');
  hotels = signal<any>([]);

  constructor(public service: Helper) {}

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

  fetchHotels(cityName: string) {
    if (cityName === 'all') {
      this.service.getAllHotels().subscribe({
        next: (data:any) => {
          this.hotels.set(data);

          if(data.length === 0){
            this.service.setError("No hotels found.")
          }
        }
      });
    } else {
      this.service.getHotelsByCity(cityName).subscribe({
        next: (data:any) => {
          this.hotels.set(data);

          if(data.length === 0){
            this.service.setError("No hoetsls found.")
          }
        }
      });
    }
  }
}
