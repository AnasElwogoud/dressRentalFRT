import { Component } from '@angular/core';
import {RouterLink} from "@angular/router";
import {NgOptimizedImage} from "@angular/common";
import {DressSearchComponent} from "../common/dress-search/dress-search.component";
import {DressResultComponent} from "../common/dress-result/dress-result.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterLink,
    NgOptimizedImage,
    DressSearchComponent,
    DressResultComponent
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  dressSearchResults: any[] = [];

  // Function to handle search results
  handleSearchResult(results: any[]): void {
    this.dressSearchResults = results; // Update the property with the new results
  }
}
