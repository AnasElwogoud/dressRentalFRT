import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../../service/api.service";
import {NgIf} from "@angular/common";
import {FormsModule} from "@angular/forms";
import {MessageService} from "primeng/api";
import {ToastModule} from "primeng/toast";

@Component({
  selector: 'app-edit-dress-page',
  standalone: true,
  imports: [
    NgIf,
    FormsModule,
    ToastModule
  ],
  providers: [MessageService],
  templateUrl: './edit-dress-page.component.html',
  styleUrl: './edit-dress-page.component.scss'
})
export class EditDressPageComponent implements OnInit {
  dressDetails = {
    dressPhoto: '',
    dressSize: '',
    dressPrice: '',
    dressDescription: ''
  };
  file: File | null = null;
  preview: string | null = null;
  error: string = '';
  success: string = '';
  dressId: string;

  constructor(
    private route: ActivatedRoute,
    private apiService: ApiService,
    private router: Router,
    private messageService: MessageService
  ) {
    this.dressId = this.route.snapshot.paramMap.get('dressId') || '';
  }

  ngOnInit(): void {
    this.fetchDressDetails();
  }

  fetchDressDetails(): void {
    this.apiService.getDressById(this.dressId).subscribe({
      next: (response) => {
        this.dressDetails = {
          dressPhoto: response.dress.dressPhotoUrl,
          dressSize: response.dress.size,
          dressPrice: response.dress.price,
          dressDescription: response.dress.description
        };
      },
      error: (error) => {
        this.error = error.error?.message || error.message;
        setTimeout(() => (this.error = ''), 5000);
      }
    });
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

  handleUpdate(): void {
    const formData = new FormData();
    formData.append('dressSize', this.dressDetails.dressSize);
    formData.append('dressPrice', this.dressDetails.dressPrice);
    formData.append('dressDescription', this.dressDetails.dressDescription);

    if (this.file) {
      formData.append('dressPhoto', this.file);
    }

    this.apiService.updateDress(this.dressId, formData).subscribe({
      next: (result) => {
        if (result.statusCode === 200) {
          this.success = 'Dress updated successfully.';
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

  handleDelete(): void {
    if (window.confirm('Do you want to delete this dress?')) {
      this.apiService.deleteDress(this.dressId).subscribe({
        next: (result) => {
          if (result.statusCode === 200) {
            this.success = 'Dress deleted successfully.';
            this.messageService.add({severity: 'success', summary: 'Success', detail: this.success});
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

}
