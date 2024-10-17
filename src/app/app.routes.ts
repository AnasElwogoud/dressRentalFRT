import { Routes } from '@angular/router';
import {HomeComponent} from "./component/home/home.component";

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Redirect to home on load
  { path: 'home', component: HomeComponent },
  // { path: 'login', component: Login },
  // { path: 'rooms', component: RoomsComponent },
];
