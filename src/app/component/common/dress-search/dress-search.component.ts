import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {ApiService} from "../../../service/api.service";

@Component({
  selector: 'app-dress-search',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  templateUrl: './dress-search.component.html',
  styleUrl: './dress-search.component.scss'
})
export class DressSearchComponent implements OnInit {
  @Output() handleSearchResult = new EventEmitter<any[]>();

  startDate: Date | null = null;
  endDate: Date | null = null;
  dressSize: string = '';
  dressSizes: string[] = [];
  error: string = '';
  @Output() searchResult = new EventEmitter<any[]>();

  constructor(private apiService: ApiService) {}

  ngOnInit(): void {
    this.fetchRoomTypes();
  }

  /** Fetch room types from API service */
  fetchRoomTypes(): void {
    this.apiService.getDressSizes().subscribe(
      (types) => this.dressSizes = types,
      (error) => console.error('Error fetching room types:', error.message)
    );
  }

  /** Show error message */
  showError(message: string, timeout: number = 5000): void {
    this.error = message;
    setTimeout(() => this.error = '', timeout);
  }

  /** Search available rooms based on criteria */
  handleInternalSearch(): void {
    if (!this.startDate || !this.endDate || !this.dressSize) {
      this.showError('Please select all fields');
      return;
    }

    const formattedStartDate = this.startDate ? this.startDate.toISOString().split('T')[0] : null;
    const formattedEndDate = this.endDate ? this.endDate.toISOString().split('T')[0] : null;

    this.apiService.getAvailableDressByDateAndSize(formattedStartDate, formattedEndDate, this.dressSize).subscribe(
      (response: any) => {
        if (response.statusCode === 200) {
          if (response.roomList.length === 0) {
            this.showError('Dress not currently available for this date range on the selected room type.');
          } else {
            this.handleSearchResult.emit(response.roomList);
            this.error = '';
          }
        }
      },
      (error) => this.showError("Unknown error occurred: " + error.message)
    );
  }

}
