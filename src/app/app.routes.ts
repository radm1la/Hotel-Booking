import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Hotels } from './hotels/hotels';
import { Rooms } from './rooms/rooms';

export const routes: Routes = [
    {path:"",component:Home},
    {path:"hotels",component:Hotels},
    {path:"rooms",component:Rooms}
];
