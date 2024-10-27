import {Routes} from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {AllDressesPageComponent} from "./component/bookingDress/all-dresses-page/all-dresses-page.component";
import {FindBookingPageComponent} from "./component/bookingDress/find-booking-page/find-booking-page.component";
import {DressDetailsPageComponent} from "./component/bookingDress/dress-details-page/dress-details-page.component";
import {LoginComponent} from "./component/Auth/login/login.component";
import {ProfilePageComponent} from "./component/profile/profile-page/profile-page.component";
import {EditProfileComponent} from "./component/profile/edit-profile/edit-profile.component";

export const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'}, // Redirect to home on load
  {path: 'home', component: HomeComponent},
  {path: 'dresses', component: AllDressesPageComponent},
  {path: 'findBooking', component: FindBookingPageComponent},
  {path: 'dressDetails/:dressId', component: DressDetailsPageComponent},
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfilePageComponent},
  {path: 'edit-profile', component: EditProfileComponent}
];
