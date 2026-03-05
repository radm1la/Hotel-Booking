import { Component, input } from '@angular/core';

@Component({
  selector: 'app-description',
  imports: [],
  templateUrl: './description.html',
  styleUrl: './description.css',
})
export class Description {
  roomInfo = input<any>();
}
