import {Component, OnInit} from '@angular/core';
import {PaginationComponent} from "../../common/pagination/pagination.component";
import {FormsModule} from "@angular/forms";
import {Dress} from "../../../service/dress";
import {ApiService} from "../../../service/api.service";
import {Observable} from "rxjs";
import {NgForOf} from "@angular/common";
import {DressResultComponent} from "../../common/dress-result/dress-result.component";
import {DressSearchComponent} from "../../common/dress-search/dress-search.component";

@Component({
  selector: 'app-all-dresses-page',
  standalone: true,
  imports: [
    PaginationComponent,
    FormsModule,
    NgForOf,
    DressResultComponent,
    DressSearchComponent
  ],
  templateUrl: './all-dresses-page.component.html',
  styleUrl: './all-dresses-page.component.scss'
})
export class AllDressesPageComponent implements OnInit {
  dresses: Dress[] = [];
  filteredDresses: Dress[] = [];
  dressSizes: string[] = [];
  selectedDressSize: string = '';
  currentPage: number = 1;
  dressesPerPage: number = 5;
  error: string = '';

  constructor(private apiService: ApiService) {
  }

  ngOnInit() {
    this.fetchDresses();
    this.fetchDressSizes();
  }

  // Fetch all dresses from the API
  fetchDresses() {
    try {
      this.apiService.getAllDress().subscribe((response: any) => {
          if (response.statusCode === 200) {
            this.dresses = response.dressList;
            if (response.dressList.length === 0) {
              this.showError('Dress not currently available for this date range on the selected dress size.');
            }
          }
        },
        (error) => this.showError("Unknown error occurred: " + error.message)
      );
      this.filteredDresses = this.dresses;
    } catch (error) {
      // @ts-ignore
      console.error('Error fetching dresses:', error.message);
    }
  }

  // Fetch all dress types from the API
  fetchDressSizes() {
    try {
      this.apiService.getDressSizes().subscribe(value => {
        this.dressSizes = value;
      })
    } catch (error) {
      // @ts-ignore
      console.error('Error fetching dress sizes:', error.message);
    }
  }

  // Handle search result (could come from a child component)
  handleSearchResult(results: Dress[]) {
    this.dresses = results;
    this.filteredDresses = results;
  }

  // Handle dress type change
  handleDressSizeChange(event: Event) {
    const target = event.target as HTMLSelectElement;
    this.selectedDressSize = target.value;
    this.filterDresses(this.selectedDressSize);
  }

  // Filter dresses by selected type
  filterDresses(size: string) {
    if (size === '') {
      this.filteredDresses = this.dresses;
    } else {
      // @ts-ignore
      this.filteredDresses = this.dresses.filter(dress => dress.size === size);
    }
    this.currentPage = 1; // Reset to first page
  }

  // Pagination Logic
  paginatedDresses(): Dress[] {
    const indexOfLastDress = this.currentPage * this.dressesPerPage;
    const indexOfFirstDress = indexOfLastDress - this.dressesPerPage;
    // @ts-ignore
    return this.filteredDresses.slice(indexOfFirstDress, indexOfLastDress);
  }

  // Change page
  paginate(pageNumber: number) {
    this.currentPage = pageNumber;
  }

  showError(message: string, timeout: number = 5000): void {
    this.error = message;
    setTimeout(() => this.error = '', timeout);
  }
}
