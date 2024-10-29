import {Component, OnInit} from '@angular/core';
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {PaginationComponent} from "../../common/pagination/pagination.component";
import {ApiService} from "../../../service/api.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-manage-booking-page',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    PaginationComponent
  ],
  templateUrl: './manage-booking-page.component.html',
  styleUrl: './manage-booking-page.component.scss'
})
export class ManageBookingPageComponent implements OnInit {
  bookings: any[] = [];
  filteredBookings: any[] = [];
  searchTerm: string = '';
  currentPage: number = 1;
  bookingsPerPage: number = 6;

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchBookings();
  }

  fetchBookings(): void {
    this.apiService.getAllBookings().subscribe({
      next: (response) => {
        this.bookings = response.bookingList;
        this.filteredBookings = response.bookingList;
      },
      error: (error) => console.error('Error fetching bookings:', error.message)
    });
  }

  handleSearchChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.searchTerm = target.value;
    this.filterBookings();
  }

  filterBookings(): void {
    this.filteredBookings = this.searchTerm
      ? this.bookings.filter((booking) =>
        booking.bookingConfirmationCode &&
        booking.bookingConfirmationCode.toLowerCase().includes(this.searchTerm.toLowerCase())
      )
      : this.bookings;
    this.currentPage = 1; // Reset to the first page after filtering
  }

  get currentBookings(): any[] {
    const start = (this.currentPage - 1) * this.bookingsPerPage;
    const end = this.currentPage * this.bookingsPerPage;
    return this.filteredBookings.slice(start, end);
  }

  paginate(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  navigateToEditBooking(bookingCode: string): void {
    this.router.navigate([`/admin/edit-booking/${bookingCode}`]);
  }
}
