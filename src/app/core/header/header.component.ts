import { Location, PopStateEvent } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostListener } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeaderComponent {
  isCollapsed = true;
  lastPoppedUrl: string;
  yScrollStack: number[] = [];
  pages = [
    {
      title: 'Strona Główna',
      url: ''
    },
    {
      title: 'Poradnia',
      url: 'poradnia'
    },
    {
      title: 'Oferta',
      url: 'oferta'
    },
    {
      title: 'Metamorfozy',
      url: 'metamorfozy'
    },
    {
      title: 'Ciekawostki',
      url: 'ciekawostki'
    },
    {
      title: 'Kontakt',
      url: 'kontakt'
    }
  ]

  constructor(public location: Location, private router: Router) { }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    const navbar = document.getElementsByTagName('nav')[0];
    if (number < 210) {
      navbar.classList.add('nav-black');
      navbar.classList.remove('bg-success');
    } else if (number > 210) {
      navbar.classList.remove('nav-black');
      navbar.classList.add('bg-success');
    }
  }

  ngOnInit() {
    this.router.events.subscribe((event) => {
      this.isCollapsed = true;
      if (event instanceof NavigationStart) {
         if (event.url != this.lastPoppedUrl)
             this.yScrollStack.push(window.scrollY);
     } else if (event instanceof NavigationEnd) {
         if (event.url == this.lastPoppedUrl) {
             this.lastPoppedUrl = undefined;
             window.scrollTo(0, this.yScrollStack.pop());
         } else
             window.scrollTo(0, 0);
     }
   });
   this.location.subscribe((ev:PopStateEvent) => {
       this.lastPoppedUrl = ev.url;
   });
  }
}
