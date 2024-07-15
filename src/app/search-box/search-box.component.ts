import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-search-box',
  templateUrl: './search-box.component.html',
  styleUrls: ['./search-box.component.css']
})
export class SearchBoxComponent {
  searchQuery: string = '';

  @Output() search: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  performSearch() {
    console.log('Searching for:', this.searchQuery);
    this.search.emit(this.searchQuery);
  }
}

