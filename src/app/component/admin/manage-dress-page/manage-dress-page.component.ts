import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../service/api.service";
import {Router} from "@angular/router";
import {FormsModule} from "@angular/forms";
import {NgForOf} from "@angular/common";
import {DressResultComponent} from "../../common/dress-result/dress-result.component";
import {PaginationComponent} from "../../common/pagination/pagination.component";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-manage-dress-page',
  standalone: true,
  imports: [
    FormsModule,
    NgForOf,
    DressResultComponent,
    PaginationComponent,
    ToastModule
  ],
  templateUrl: './manage-dress-page.component.html',
  styleUrl: './manage-dress-page.component.scss'
})
export class ManageDressPageComponent implements OnInit {
  dresses: any[] = [];
  filteredDress: any[] = [];
  dressSizes: string[] = [];
  selectedDressSize: string = '';
  currentPage: number = 1;
  dressesPerPage: number = 5;

  constructor(private apiService: ApiService, private router: Router) {
  }

  ngOnInit(): void {
    this.fetchDresses();
    this.fetchDressSize();
  }

  fetchDresses(): void {
    this.apiService.getAllDress().subscribe({
      next: (response) => {
        this.dresses = response.dressList;
        this.filteredDress = response.dressList;
      },
      error: (error) => console.error('Error fetching dresses:', error.message)
    });
  }

  fetchDressSize(): void {
    this.apiService.getDressSizes().subscribe({
      next: (sizes) => this.dressSizes = sizes,
      error: (error) => console.error('Error fetching dress sizes:', error.message)
    });
  }

  handleDressSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    this.selectedDressSize = target.value;
    this.filterDresses(this.selectedDressSize);
  }

  filterDresses(size: string): void {
    this.filteredDress = size ? this.dresses.filter(dress => dress.size === size) : this.dresses;
    this.currentPage = 1; // Reset to first page
  }

  // Pagination
  get currentDresses(): any[] {
    const start = (this.currentPage - 1) * this.dressesPerPage;
    const end = this.currentPage * this.dressesPerPage;
    return this.filteredDress.slice(start, end);
  }

  paginate(pageNumber: number): void {
    this.currentPage = pageNumber;
  }

  navigate(): void {
    this.router.navigate(['/admin/add-dress']);
  }
}
