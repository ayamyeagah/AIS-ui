import { Component } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  searchQuery: string = '';

  constructor() { }

  performSearch() {
    console.log('Searching for:', this.searchQuery);
    // Implement the search functionality here
  }
}

