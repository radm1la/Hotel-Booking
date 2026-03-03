import { Component, effect, input } from '@angular/core';

@Component({
  selector: 'app-cards-component',
  imports: [],
  templateUrl: './cards-component.html',
  styleUrl: './cards-component.css',
})
export class CardsComponent {
  roomsList = input<any[]>([]);

  constructor(){
    effect(() => {
      console.log('Rooms List updated:', this.roomsList());
    });
  }
}
