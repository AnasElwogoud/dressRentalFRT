import {Component} from '@angular/core';
import {ApiService} from "../../../service/api.service";
import {Router} from '@angular/router';
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgIf

  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})

export class HeaderComponent {
  isAuthenticated: boolean;
  isAdmin: boolean;
  isUser: boolean;

  constructor(private apiService: ApiService, private router: Router) {
    this.isAuthenticated = this.apiService.isAuthenticated();
    this.isAdmin = this.apiService.isAdmin();
    this.isUser = this.apiService.isUser();
  }

  handleLogout = () => {
    let isLogout = window.confirm('Are you sure you want to logout this user?');
    if (isLogout) {
      this.apiService.logout();
      this.router.navigate(['/login']);
    }
  };
}
