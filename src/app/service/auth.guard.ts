import {CanActivateFn} from '@angular/router';
import {inject} from "@angular/core";
import {ApiService} from "./api.service";
import { Router } from '@angular/router';  // For navigation

export const authGuard: CanActivateFn = (route, state) => {
  const apiService = inject(ApiService);
  const isAuthenticated = apiService.isAuthenticated();
  const isAdmin = apiService.isAdmin();
  const router = inject(Router);
  if (isAuthenticated || isAdmin) {
    return true;
  } else {
    // Optionally redirect to a login page
    router.navigate(['/login']);
    return false;
  }

};


