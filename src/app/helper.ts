import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class Helper {
  constructor(private http:HttpClient){}

  public cityName = new Subject<string>();

  getAllRooms(){
    return this.http.get<any[]>("https://hotelbooking.stepprojects.ge/api/Rooms/GetAll");
  }

  getAllCities(){
    return this.http.get("https://hotelbooking.stepprojects.ge/api/Hotels/GetCities");
  }

  getHotelsByCity(city:string){
    return this.http.get(`https://hotelbooking.stepprojects.ge/api/Hotels/GetHotels?city=${city}`)
  }

  getAllHotels(){
    return this.http.get("https://hotelbooking.stepprojects.ge/api/Hotels/GetAll");
  }

  getHotelById(id:number){
    return this.http.get(`https://hotelbooking.stepprojects.ge/api/Hotels/GetHotel/${id}`)
  }
}
