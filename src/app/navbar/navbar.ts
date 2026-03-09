import { Component, HostListener, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink } from "@angular/router";
import { filter } from 'rxjs';
import { Helper } from '../helper';
import { CookieService } from 'ngx-cookie-service';


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

  logOut(){
    this.service.isLogged.next(false);
    this.cookie.delete("user_token");
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

  constructor(private router: Router,private service:Helper,private cookie:CookieService) {
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
