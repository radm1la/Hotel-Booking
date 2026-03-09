import { Component, HostListener, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { filter } from 'rxjs';
import { Helper } from '../helper';

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
  isLogged = false;

  checkAuth(){
    this.service.isLogged.subscribe((data)=>{
      this.isLogged = data;
    })
  }

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

  currentUrl: string = '';

  constructor(private router: Router,private service:Helper) {
    this.checkAuth();
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: any) => {
      this.currentUrl = event.urlAfterRedirects;
    });
  }

  isActive(path: string): boolean {
    if (path === '/') {
      return this.currentUrl === '/';
    }
    return this.currentUrl.includes(path);
  }


}
