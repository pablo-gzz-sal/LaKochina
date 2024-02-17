import { Component, Renderer2 } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { burgerMenuAnimation } from 'src/app/shared/burger-menu.animation';

@Component({
  selector: 'app-header-mobile',
  standalone: true,
  templateUrl: './header-mobile.component.html',
  styleUrl: './header-mobile.component.scss',
  imports: [CommonModule],
  animations: [burgerMenuAnimation]
})
export class HeaderMobileComponent {

  
  showMenu: boolean = false;
  menuState: 'open' | 'closed' = 'closed';
  constructor(private route: Router, private renderer: Renderer2) {}

  onContact() {
    this.route.navigate(['/contact'])
  }

  onHome() {
    this.route.navigate([''])
  }

  onMenu() {
    this.route.navigate(['/menu'])
  } 

  toggleMenu() {
    this.showMenu = !this.showMenu;
    if (this.showMenu) {
      this.renderer.addClass(document.body, 'menu-opened');
    } else {
      this.renderer.removeClass(document.body, 'menu-opened');
    }
  }

}
