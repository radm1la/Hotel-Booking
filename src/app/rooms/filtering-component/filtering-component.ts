import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatSliderModule} from '@angular/material/slider';

@Component({
  selector: 'app-filtering-component',
  imports: [ MatSliderModule,FormsModule ],
  templateUrl: './filtering-component.html',
  styleUrl: './filtering-component.css',
})
export class FilteringComponent {
  //price slider logic
  minPrice = 100;
  maxPrice = 800;
  priceLimit = 1000;

  changePrice(){

  }

  validateInputs(){
    if(this.minPrice < 0){
      this.minPrice = 0;
    }
    if(this.maxPrice > this.priceLimit){
      this.maxPrice = this.priceLimit;
    }
    if(this.minPrice > this.maxPrice){
      this.minPrice = this.maxPrice;
    }
  }
}
