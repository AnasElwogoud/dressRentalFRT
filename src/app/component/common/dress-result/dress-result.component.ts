import {Component, Input} from '@angular/core';
import {Router} from "@angular/router";
import {ApiService} from "../../../service/api.service";
import {NgForOf, NgIf, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-dress-result',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgForOf,
    NgIf
  ],
  templateUrl: './dress-result.component.html',
  styleUrl: './dress-result.component.scss'
})
export class DressResultComponent {
  @Input() dressSearchResults: any[] = [];  // Receive data from parent component

  constructor(private router: Router, private apiService: ApiService) {
  }

  isAdmin(): boolean {
    return this.apiService.isAdmin();
  }

  navigateToDress(dressId: number, isAdmin: boolean): void {
    if (isAdmin) {
      this.router.navigate([`/admin/edit-room/${dressId}`]).then(r => console.log(r));
    } else {
      this.router.navigate([`/dress-details-book/${dressId}`]).then(r => console.log(r));
    }
  }
}
