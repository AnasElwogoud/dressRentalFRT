import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../service/api.service";
import {Router} from "@angular/router";
import {NgIf} from "@angular/common";

@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [
    NgIf
  ],
  templateUrl: './edit-profile.component.html',
  styleUrl: './edit-profile.component.scss'
})
export class EditProfileComponent implements OnInit {
  user: any = null;
  error: string | null = null;

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  private fetchUserProfile() {
    try {
      this.apiService.getUserProfile().subscribe(response => {
        this.user = response.user;
      });
    } catch (error: any) {
      this.error = error.message;
    }
  }

  handleDeleteProfile() {
    if (!window.confirm('Are you sure you want to delete your account?')) {
      return;
    }
    try {
      this.apiService.deleteUser(this.user.id);
      this.router.navigate(['/signup']);
    } catch (error: any) {
      this.error = error.message;
    }
  }
}
