import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../service/api.service";
import {NgIf} from "@angular/common";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-edit-booking-page',
  standalone: true,
  imports: [
    NgIf,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './edit-booking-page.component.html',
  styleUrl: './edit-booking-page.component.scss'
})
export class EditBookingPageComponent implements OnInit {
  bookingDetails: any = null;
  error: string | null = null;
  success: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
    const confirmationCode = this.route.snapshot.paramMap.get('bookingCode');
    this.fetchBookingDetails(confirmationCode);
  }

  fetchBookingDetails(bookingCode: string | null): void {
    if (!bookingCode) return;
    this.apiService.getBookingByConfirmationCode(bookingCode).subscribe({
      next: (response) => {
        this.bookingDetails = response.bookings;
      },
      error: (err) => {
        this.error = err.message;
        setTimeout(() => this.error = null, 5000);
      }
    });
  }

  achieveBooking(bookingId: string): void {
    if (!confirm('Are you sure you want to Archive this booking?')) {
      return;
    }
    this.apiService.cancelBooking(bookingId).subscribe({
      next: (response) => {
        if (response.statusCode === 200) {
          this.success = "The booking was successfully archived.";
          this.messageService.add({severity: 'success', summary: 'Success', detail: this.success});
          setTimeout(() => {
            this.success = null;
            this.router.navigate(['/admin/manage-bookings']);
          }, 5000);
        }
      },
      error: (err) => {
        this.error = err.error?.message || err.message;
        // @ts-ignore
        this.messageService.add({severity: 'error', summary: 'Error', detail: this.error});
        setTimeout(() => this.error = null, 5000);
      }
    });
  }
}
