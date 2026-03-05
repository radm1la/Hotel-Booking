import { Component, OnInit, output, signal } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { Helper } from '../../helper';

@Component({
  selector: 'app-filtering-component',
  imports: [MatSliderModule, ReactiveFormsModule],
  templateUrl: './filtering-component.html',
  styleUrl: './filtering-component.css',
})
export class FilteringComponent implements OnInit {
  filteredResults = output<any[]>();
  today = new Date().toISOString().split('T')[0];
  priceLimit = 1000;
  roomTypes = signal<any>([]);

  formInfo = new FormGroup({
    roomTypeId: new FormControl(0),
    priceFrom: new FormControl(0),
    priceTo: new FormControl(800),
    maximumGuests: new FormControl(1),
    checkIn: new FormControl(''),
    checkOut: new FormControl(''),
  });

  formatDate(dateString: string | null | undefined): string {
    if (!dateString || dateString === '') {
      return new Date().toISOString();
    }
    const date = new Date(dateString);
    return date.toISOString();
  }
  constructor(private service: Helper) {}

  ngOnInit(): void {
    this.fetchRoomTypes();
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

  //filtering

  filter() {
    const values = this.formInfo.value;

    if (values.checkIn && values.checkOut && values.checkIn > values.checkOut) {
      alert('Check-out date cannot be before Check-in!');
      return;
    }

    const filterData = {
      roomTypeId: Number(values.roomTypeId) || 0,
      priceFrom: values.priceFrom ?? 0,
      priceTo: values.priceTo ?? 800,
      maximumGuests: values.maximumGuests ?? 1,
      checkIn: this.formatDate(values.checkIn),
      checkOut: this.formatDate(values.checkOut),
    };

    this.service.postFilteredData(filterData).subscribe({
      next: (res: any) => this.filteredResults.emit(res),
      error: (err) => console.error('Filter error:', err),
    });
  }

  resetFilters() {
    this.formInfo.reset({
      roomTypeId: 0,
      priceFrom: 0,
      priceTo: 800,
      maximumGuests: 1,
      checkIn: '',
      checkOut: '',
    });
    this.filter();
  }
}
