import {Component, EventEmitter, Input, Output} from '@angular/core';
import {NgClass, NgForOf} from "@angular/common";

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [
    NgClass,
    NgForOf
  ],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.scss'
})
export class PaginationComponent {

  @Input() dressesPerPage: number | undefined;
  @Input() totalDresses: number | undefined;
  @Input() currentPage: number | undefined;
  @Output() paginate = new EventEmitter<number>();

  get pageNumbers(): number[] {
    let pages = [];
    // @ts-ignore
    for (let i = 1; i <= Math.ceil(this.totalDresses / this.dressesPerPage); i++) {
      pages.push(i);
    }
    return pages;
  }

  onPageClick(pageNumber: number) {
    this.paginate.emit(pageNumber);
  }
}
