import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Hotels } from './hotels/hotels';
import { Rooms } from './rooms/rooms';
import { NotFoundComponent } from './not-found-component/not-found-component';

export const routes: Routes = [
    {path:"",component:Home},
    {path:"hotels",component:Hotels},
    {path:"rooms/:hotelId",component:Rooms},
    {path:"**",component:NotFoundComponent}
];
