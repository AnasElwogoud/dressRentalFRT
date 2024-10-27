import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../service/api.service";
import {Router} from "@angular/router";
import {NgForOf, NgIf} from "@angular/common";

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [
    NgIf,
    NgForOf
  ],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnInit {
  user: any = null;
  error: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  private fetchUserProfile() {
    try {
      this.apiService.getUserProfile().subscribe((data) => {
        this.apiService.getUserBookings(data.user.id).subscribe(response => {
          this.user = response.user;
        });
      });
    } catch (error: any) {
      this.error = error.error?.message || error.message;
    }
  }

  handleLogout(): void {
    this.apiService.logout();
    this.router.navigate(['/home']);
  }

  handleEditProfile(): void {
    this.router.navigate(['/edit-profile']);
  }
}
