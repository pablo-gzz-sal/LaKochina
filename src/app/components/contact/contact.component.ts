import { Component, OnInit, Renderer2 } from '@angular/core';
import { HeaderComponent } from "../header/header.component";
import { FooterComponent } from "../footer/footer.component";
import { HeaderMobileComponent } from "../header-mobile/header-mobile.component";
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { timer } from 'rxjs'

@Component({
    selector: 'app-contact',
    standalone: true,
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss',
    imports: [HeaderComponent, FooterComponent, HeaderMobileComponent]
})
export class ContactComponent implements OnInit {

    constructor(private router: Router, private renderer:Renderer2){}

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
