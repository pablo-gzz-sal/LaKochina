import { Component, OnInit, Renderer2 } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { ScrollingBannerComponent } from "../scrolling-banner/scrolling-banner.component";
import { Router, NavigationEnd } from '@angular/router';
import { HeaderMobileComponent } from "../header-mobile/header-mobile.component";
import { filter, switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [FooterComponent, HeaderComponent, ScrollingBannerComponent, HeaderMobileComponent]
})
export class DashboardComponent implements OnInit {

  infoBannerInsta!: string[]

    constructor(private route: Router, private renderer:Renderer2) {}

    ngOnInit() {
      this.infoBannerInsta = ['FOLLOW US: @LAKOCHINA512']
      this.renderer.removeClass(document.body, 'menu-opened');
      this.route.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        switchMap(() => timer(600))
      )
      .subscribe(() => {
        window.scrollTo(0, 0);
      });
      }

    onContact() {
        this.route.navigate(['/contact'])
    }

    onMenu() {
        this.route.navigate(['/menu'])
    }

}
