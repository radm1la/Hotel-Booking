import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Helper {
  constructor(private http:HttpClient){}

  getAllRooms(){
    return this.http.get<any[]>("https://hotelbooking.stepprojects.ge/api/Rooms/GetAll");
  }
}
