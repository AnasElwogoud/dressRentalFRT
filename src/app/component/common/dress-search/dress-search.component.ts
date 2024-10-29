import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormControl, FormsModule, ReactiveFormsModule} from '@angular/forms';
import {CommonModule} from '@angular/common';
import {ApiService} from "../../../service/api.service";

@Component({
  selector: 'app-dress-search',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dress-search.component.html',
  styleUrl: './dress-search.component.scss'
})
export class DressSearchComponent implements OnInit {
  // @Output() handleSearchResult = new EventEmitter<any[]>();

  startDate: Date | null = null;
  endDate: Date | null = null;
  dressSize: string = '';
  dressSizes: string[] = [];
  error: string = '';
  @Output() searchResult = new EventEmitter<any[]>();

  constructor(private apiService: ApiService) {
  }

  ngOnInit(): void {
    this.fetchDressSizes();
  }

  /** Fetch dress Sizes from API service */
  fetchDressSizes(): void {
    this.apiService.getDressSizes().subscribe(
      (sizes) => this.dressSizes = sizes,
      (error) => console.error('Error fetching dress types:', error.message)
    );
  }

  /** Show error message */
  showError(message: string, timeout: number = 5000): void {
    this.error = message;
    setTimeout(() => this.error = '', timeout);
  }

  /** Search available dresses based on criteria */
  handleInternalSearch(): void {
    if (!this.startDate || !this.endDate || !this.dressSize) {
      this.showError('Please select all fields');
      return;
    }

    let formattedStartDate = null;

    if (this.startDate) {
      const dateObj = new Date(this.startDate); // Ensures it's a Date object
      if (!isNaN(dateObj.getTime())) { // Check if it's a valid date
        formattedStartDate = dateObj.toISOString().split('T')[0];
      }
    }

    let formattedEndDate = null;
    if (this.endDate) {
      const dateObj = new Date(this.endDate); // Ensures it's a Date object
      if (!isNaN(dateObj.getTime())) { // Check if it's a valid date
        formattedEndDate = dateObj.toISOString().split('T')[0];
      }
    }

    this.apiService.getAvailableDressByDateAndSize(formattedStartDate, formattedEndDate, this.dressSize).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          if (response.dressList.length === 0) {
            this.showError('Dress not currently available for this date range on the selected dress size.');
          } else {
            this.searchResult.emit(response.dressList);
            this.error = '';
          }
        }
      },
      (error) => this.showError("Unknown error occurred: " + error.message)
    );
  }

}
