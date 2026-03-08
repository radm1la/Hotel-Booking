import { HttpClient, HttpContext } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Subject } from 'rxjs';
import { IS_SILENT } from './interceptors/app-interceptor';

@Injectable({
  providedIn: 'root',
})
export class Helper {
  isLoading = signal(false);
  dataLoaded = signal(false);
  errorMsg = signal("");

  constructor(private http:HttpClient){}

  public cityName = new Subject<string>();

  startLoading() {
    this.isLoading.set(true);
    this.dataLoaded.set(false);
    this.errorMsg.set("");
  }

  setSuccess() {
    this.isLoading.set(false);
    this.dataLoaded.set(true);
  }

  setError(msg: string) {
    this.isLoading.set(false);
    this.dataLoaded.set(false);
    this.errorMsg.set(msg);
  }

  getAllRooms(){
    return this.http.get<any[]>("https://hotelbooking.stepprojects.ge/api/Rooms/GetAll");
  }

  getAllCities(){
    return this.http.get("https://hotelbooking.stepprojects.ge/api/Hotels/GetCities", {
    context: new HttpContext().set(IS_SILENT, true)
  });
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

  getRoomTypes(){
    return this.http.get("https://hotelbooking.stepprojects.ge/api/Rooms/GetRoomTypes");
  }

  getRoomById(id:number){
    return this.http.get(`https://hotelbooking.stepprojects.ge/api/Rooms/GetRoom/${id}`)
  }

  postFilteredData(info:any){
    return this.http.post("https://hotelbooking.stepprojects.ge/api/Rooms/GetFiltered",info);
  }

  postLogin(info:any){
    return this.http.post("https://api.everrest.educata.dev/auth/sign_in",info);
  }
}
