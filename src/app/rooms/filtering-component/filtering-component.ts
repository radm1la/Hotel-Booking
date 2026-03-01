import { Component, OnInit, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { Helper } from '../../helper';

@Component({
  selector: 'app-filtering-component',
  imports: [MatSliderModule, FormsModule],
  templateUrl: './filtering-component.html',
  styleUrl: './filtering-component.css',
})
export class FilteringComponent implements OnInit {
  roomTypes = signal<any>([]);
  selectedRoomType = '0';

  checkInDate: string = '';
  checkOutDate: string = '';
  today = new Date().toISOString().split('T')[0];

  maximumGuests: number = 1;

  constructor(private service: Helper) {}

  ngOnInit(): void {
    this.fetchRoomTypes();
  }
  //price slider logic
  minPrice = 100;
  maxPrice = 800;
  priceLimit = 1000;

  validateInputs() {
    if (this.minPrice < 0) {
      this.minPrice = 0;
    }
    if (this.maxPrice > this.priceLimit) {
      this.maxPrice = this.priceLimit;
    }
    if (this.minPrice > this.maxPrice) {
      this.minPrice = this.maxPrice;
    }
  }

  //room types
  fetchRoomTypes() {
    this.service.getRoomTypes().subscribe({
      next: (data: any) => {
        this.roomTypes.set(data);
      },
      error: (bad) => {
        console.log('Error loading room types. ', bad);
      },
    });
  }

  //check in/out
  validateDates() {
    if (this.checkInDate && this.checkOutDate) {
      if (this.checkInDate > this.checkOutDate) {
        this.checkOutDate = this.checkInDate;
      }
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toISOString();
  }

  //guests num

  validateGuests() {
    if (this.maximumGuests < 1) {
      this.maximumGuests = 1;
    }
    if (this.maximumGuests > 6) {
      this.maximumGuests = 6;
    }
  }
}
