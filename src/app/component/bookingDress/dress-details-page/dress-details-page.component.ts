import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../service/api.service";
import {CommonModule, DatePipe} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MessageService} from 'primeng/api';
import {ToastModule} from 'primeng/toast';
import {ButtonModule} from 'primeng/button';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

@Component({
  selector: 'app-dress-details-page',
  standalone: true,
  imports: [
    FormsModule,
    DatePipe,
    ToastModule,
    ButtonModule,
    CommonModule,
  ],
  providers: [MessageService,],
  templateUrl: './dress-details-page.component.html',
  styleUrl: './dress-details-page.component.scss'
})
export class DressDetailsPageComponent implements OnInit {
  dressId: any | null = null;
  dressDetails: any = null;
  isLoading = true;
  error: string | null = null;
  rentalDate: Date | null = null;
  returnDate: Date | null = null;
  totalPrice = 0;
  showDatePicker = false;
  userId: any;
  showMessage = false;
  confirmationCode = '';
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    this.dressId = this.route.snapshot.paramMap.get('dressId');
    if (this.dressId)
      this.fetchData(this.dressId);
  }

  fetchData(dressId: string) {
    try {
      this.isLoading = true; // Set loading state to true
      this.apiService.getDressById(dressId).subscribe((resp) => {
        this.dressDetails = resp.dress;
      });

      this.apiService.getUserProfile().subscribe((data) => {
        this.userId = data.user.id;
      });
    } catch (error: any) {
      this.error = error.error?.message || error.message;
    } finally {
      this.isLoading = false;
    }
  }

  handleConfirmBooking() {
    if (!this.rentalDate || !this.returnDate) {
      this.errorMessage = 'Please select Rental and Return dates.';
      setTimeout(() => (this.errorMessage = ''), 5000);
      return;
    }
    const oneDay = 24 * 60 * 60 * 1000;
    const startDate = new Date(this.rentalDate);
    const endDate = new Date(this.returnDate);
    const totalDays = Math.round(Math.abs((endDate.getTime() - startDate.getTime()) / oneDay)) + 1;

    // Calculate total number of guests and total price
    this.totalPrice = this.dressDetails.price * totalDays;
  }

  acceptBooking() {
    try {
      const startDate = new Date(this.rentalDate!);
      const endDate = new Date(this.returnDate!);

      let formattedRentalDate = null;
      if (startDate) {
        const dateObj = new Date(startDate); // Ensures it's a Date object
        if (!isNaN(dateObj.getTime())) { // Check if it's a valid date
          formattedRentalDate = dateObj.toISOString().split('T')[0];
        }
      }

      let formattedReturnDate = null;
      if (endDate) {
        const dateObj = new Date(endDate); // Ensures it's a Date object
        if (!isNaN(dateObj.getTime())) { // Check if it's a valid date
          formattedReturnDate = dateObj.toISOString().split('T')[0];
        }
      }
      const booking = {
        rentalDate: formattedRentalDate,
        returnDate: formattedReturnDate,
      };
      this.apiService.bookDress(this.dressId, this.userId, booking).subscribe((success) => {
        if (success.statusCode === 200) {
          this.confirmationCode = success.bookingConfirmationCode;
          this.showMessage = true;

          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: `Booking successful! Confirmation code: ${this.confirmationCode}`
          });
          setTimeout(() => {
            this.showMessage = false;
            this.router.navigate(['/dresses']);
          }, 5000);
        }
      }, err => {
        this.errorMessage = err.error.message
        if (this.errorMessage.includes('Error Saving a booking:'))
          this.errorMessage = 'Error Saving a Booking: Date To must be in Future.'
        this.messageService.add({severity: 'error', summary: 'Error', detail: this.errorMessage});

        setTimeout(() => (this.errorMessage = ''), 5000);
      });

    } catch (error: any) {
      this.errorMessage = error?.message || error.message;
      setTimeout(() => (this.errorMessage = ''), 5000);
    }
  }
}
