import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
  host: {
    '[class.nav-hidden]': 'isHidden()'
  }
})
export class Navbar {
  isHidden = signal(false);
  private lastScrollY = 0;

  @HostListener('window:scroll',[])
  onWindowScroll(){
    const currentScroll = window.scrollY;

    if(currentScroll > this.lastScrollY && currentScroll > 100){
      this.isHidden.set(true);
    }else{
      this.isHidden.set(false);
    }

    this.lastScrollY = currentScroll;
  }
}
