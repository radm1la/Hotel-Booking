import { Component, computed, input, signal } from '@angular/core';

@Component({
  selector: 'app-description',
  imports: [],
  templateUrl: './description.html',
  styleUrl: './description.css',
})
export class Description {
  roomInfo = input<any>();
  isAnimating = signal(false);
  size = computed(() => {
    return this.roomInfo()?.images?.length || 0;
  });

  currentImg = 0;

  prev() {
    if (this.currentImg > 0) {
      this.currentImg--;
      this.triggerAnimation();
    }
  }

  next() {
    if (this.currentImg < this.size() - 1) {
      this.currentImg++;
      this.triggerAnimation();
    }
  }

  triggerAnimation() {
    this.isAnimating.set(true);
    setTimeout(() => this.isAnimating.set(false), 1200);
  }
}
