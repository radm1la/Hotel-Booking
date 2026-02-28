import { Component, signal } from '@angular/core';
import { Helper } from '../../helper';

@Component({
  selector: 'app-cities',
  imports: [],
  templateUrl: './cities.html',
  styleUrl: './cities.css',
})
export class Cities {
  constructor(private service:Helper){
    this.fetchCities();
  }

  cities = signal<any>([]);
  selectedCity = signal('all');

  fetchCities(){
    this.service.getAllCities().subscribe({
      next:(data)=>{
        this.cities.set(data);
      },
      error:(badData)=>{
        console.log("Error loading cities. ",badData);
      }
    })
  }

  selectCity(name:string){
    this.selectedCity.set(name);
  }
}
