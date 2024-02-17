import { Component, OnInit, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ScrollingBannerComponent } from '../scrolling-banner/scrolling-banner.component';
import { ImageGridComponent } from '../image-grid/image-grid.component';
import { HeaderMobileComponent } from '../header-mobile/header-mobile.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
  selector: 'app-menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  imports: [
    HeaderComponent,
    FooterComponent,
    ScrollingBannerComponent,
    ImageGridComponent,
    HeaderMobileComponent,
  ],
})
export class MenuComponent implements OnInit {
  constructor(private router: Router, private renderer:Renderer2) {}

  ngOnInit() {
    this.renderer.removeClass(document.body, 'menu-opened');
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        switchMap(() => timer(600))
      )
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
  }
}
