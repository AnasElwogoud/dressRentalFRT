import {Component, OnInit} from '@angular/core';
import {ApiService} from "../../../service/api.service";
import {Router} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {CommonModule, NgForOf, NgIf} from "@angular/common";
import {ToastModule} from "primeng/toast";
import {MessageService} from "primeng/api";
import {ButtonModule} from "primeng/button";

@Component({
  selector: 'app-add-dress-page',
  standalone: true,
  imports: [
    FormsModule,
    NgIf,
    NgForOf,
    ReactiveFormsModule,
    ToastModule,
    CommonModule,
    ButtonModule,
  ],
  providers: [MessageService],
  templateUrl: './add-dress-page.component.html',
  styleUrl: './add-dress-page.component.scss'
})
export class AddDressPageComponent implements OnInit {
  dressDetails = {
    dressPhoto: File,
    dressSize: '',
    dressPrice: '',
    dressDescription: ''
  };
  file: File | null = null;
  preview: string | null = null;
  error: string = '';
  success: string = '';
  dressSizes: string[] = [];
  newDressSize: boolean = false;

  constructor(private apiService: ApiService, private router: Router, private messageService: MessageService) {

  }

  ngOnInit(): void {
    this.fetchDressSizes();
  }

  fetchDressSizes(): void {
    this.apiService.getDressSizes().subscribe({
      next: (sizes) => {
        this.dressSizes = sizes;
      },
      error: (error) => {
        console.error('Error fetching dress types:', error.message);
      }
    });
  }

  handleChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.dressDetails = {...this.dressDetails, [target.name]: target.value};
  }

  handleDressSizeChange(event: Event): void {
    const target = event.target as HTMLSelectElement;
    if (target.value === 'new') {
      this.newDressSize = true;
      this.dressDetails.dressSize = '';
    } else {
      this.newDressSize = false;
      this.dressDetails.dressSize = target.value;
    }
  }

  handleFileChange(event: Event): void {
    const target = event.target as HTMLInputElement;
    const selectedFile = target.files?.[0] || null;
    if (selectedFile) {
      this.file = selectedFile;
      this.preview = URL.createObjectURL(selectedFile);
    } else {
      this.file = null;
      this.preview = null;
    }
  }

  addDress(): void {
    if (!this.dressDetails.dressSize || !this.dressDetails.dressPrice || !this.dressDetails.dressDescription) {
      this.error = 'All dress details must be provided.';
      setTimeout(() => (this.error = ''), 5000);
      return;
    }

    if (!window.confirm('Do you want to add this dress?')) {
      return;
    }

    const formData = new FormData();
    formData.append('dressSize', this.dressDetails.dressSize.toString());
    formData.append('dressPrice', this.dressDetails.dressPrice);
    formData.append('dressDescription', this.dressDetails.dressDescription.toString());

    if (this.file) {
      formData.append('dressPhoto', this.file);
    }
    this.apiService.addDress(formData).subscribe({
      next: (result) => {
        if (result.statusCode === 200) {
          this.success = 'Dress added successfully.';
          this.messageService.add({
            severity: 'success',
            summary: 'Success',
            detail: this.success
          });
          setTimeout(() => {
            this.success = '';
            this.router.navigate(['/admin/manage-dress']);
          }, 5000);
        }
      },
      error: (error) => {
        this.error = error.error?.message || error.message;
        this.messageService.add({severity: 'error', summary: 'Error', detail: this.error});
        setTimeout(() => (this.error = ''), 5000);
      }
    });
  }
}
