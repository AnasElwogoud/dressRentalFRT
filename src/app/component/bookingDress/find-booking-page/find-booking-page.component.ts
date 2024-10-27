import {Component} from '@angular/core';
import {NgIf, NgOptimizedImage} from "@angular/common";
import {ApiService} from "../../../service/api.service";
import {FormsModule} from "@angular/forms";

@Component({
  selector: 'app-find-booking-page',
  standalone: true,
  imports: [
    NgOptimizedImage,
    NgIf,
    FormsModule
  ],
  templateUrl: './find-booking-page.component.html',
  styleUrl: './find-booking-page.component.scss'
})
export class FindBookingPageComponent {
  confirmationCode: string = ''; // Holds the user input for confirmation code
  bookingDetails: any = null; // Holds the fetched booking details
  error: string = ''; // Holds error messages

  constructor(private apiService: ApiService) {
  }

  // Function to handle the search action
  handleSearch() {
    if (!this.confirmationCode.trim()) {
      this.error = "Please Enter a booking confirmation code";
      setTimeout(() => (this.error = ''), 5000);
      return;
    }

    try {
      // Call the service to fetch booking details by confirmation code
      this.apiService.getBookingByConfirmationCode(this.confirmationCode).subscribe((data: any) => {
        this.bookingDetails = data.bookings;
      })
    } catch (err) {
      // @ts-ignore
      this.error = err.error?.message || err.message;
      setTimeout(() => (this.error = ''), 5000);
    }
  }
}
