import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Hotels } from './hotels/hotels';
import { Rooms } from './rooms/rooms';
import { NotFoundComponent } from './not-found-component/not-found-component';
import { RoomDetail } from './room-detail/room-detail';
import { Login } from './auth/login/login';
import { Signup } from './auth/signup/signup';

export const routes: Routes = [
    {path:"",component:Home},
    {path:"hotels",component:Hotels},
    {path:"rooms/:hotelId",component:Rooms},
    {path:"room/:roomId",component:RoomDetail},
    {path:"login",component:Login},
    {path:"signup",component:Signup},
    {path:"**",component:NotFoundComponent}
];
