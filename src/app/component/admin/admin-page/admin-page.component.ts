import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../service/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-admin-page',
  standalone: true,
  imports: [],
  templateUrl: './admin-page.component.html',
  styleUrl: './admin-page.component.scss'
})
export class AdminPageComponent implements OnInit {
  adminName: string = '';

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchAdminName();
  }

  private fetchAdminName(): void {
    this.apiService.getUserProfile().subscribe({
      next: (response) => {
        this.adminName = response.user.name;
      },
      error: (error) => {
        console.error('Error fetching admin details:', error.message);
      }
    });
  }

  navigateTo(path: string): void {
    this.router.navigate([path]);
  }

}
