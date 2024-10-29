import {Routes} from '@angular/router';
import {HomeComponent} from "./component/home/home.component";
import {AllDressesPageComponent} from "./component/bookingDress/all-dresses-page/all-dresses-page.component";
import {FindBookingPageComponent} from "./component/bookingDress/find-booking-page/find-booking-page.component";
import {DressDetailsPageComponent} from "./component/bookingDress/dress-details-page/dress-details-page.component";
import {LoginComponent} from "./component/Auth/login/login.component";
import {ProfilePageComponent} from "./component/profile/profile-page/profile-page.component";
import {EditProfileComponent} from "./component/profile/edit-profile/edit-profile.component";
import {authGuard} from "./service/auth.guard";
import {ManageDressPageComponent} from "./component/admin/manage-dress-page/manage-dress-page.component";
import {EditDressPageComponent} from "./component/admin/edit-dress-page/edit-dress-page.component";
import {AddDressPageComponent} from "./component/admin/add-dress-page/add-dress-page.component";
import {ManageBookingPageComponent} from "./component/admin/manage-booking-page/manage-booking-page.component";
import {EditBookingPageComponent} from "./component/admin/edit-booking-page/edit-booking-page.component";
import {AdminPageComponent} from "./component/admin/admin-page/admin-page.component";

export const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'dresses', component: AllDressesPageComponent},
  {path: 'login', component: LoginComponent},


  {path: 'findBooking', component: FindBookingPageComponent, canActivate: [authGuard]},
  {path: 'dressDetails/:dressId', component: DressDetailsPageComponent, canActivate: [authGuard]},
  {path: 'profile', component: ProfilePageComponent, canActivate: [authGuard]},
  {path: 'edit-profile', component: EditProfileComponent, canActivate: [authGuard]},
  // {path: 'manage-dress', component: ManageDressPageComponent},
  // {path: 'edit-dress/:dressId', component: EditDressPageComponent},
  // {path: 'add-room', component: AddDressPageComponent},
  // {path: 'manage-bookings', component: ManageBookingPageComponent},
  // {path: 'edit-booking/:bookingCode', component: EditBookingPageComponent},
  {
    path: 'admin', canActivate: [authGuard], children: [
      {path: '', component: AdminPageComponent},
      {path: 'manage-dress', component: ManageDressPageComponent},
      {path: 'edit-dress/:dressId', component: EditDressPageComponent},
      {path: 'add-dress', component: AddDressPageComponent},
      {path: 'manage-bookings', component: ManageBookingPageComponent},
      {path: 'edit-booking/:bookingCode', component: EditBookingPageComponent}]
  },
  {path: '', redirectTo: '/home', pathMatch: 'full'}, // Redirect to home on load
  {path: '**', redirectTo: '/home', pathMatch: 'full'}, // Redirect to home on load
];
