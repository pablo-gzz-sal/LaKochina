import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scrolling-banner',
  standalone: true,
  imports: [],
  templateUrl: './scrolling-banner.component.html',
  styleUrl: './scrolling-banner.component.scss'
})
export class ScrollingBannerComponent {

  @Input()
  infoBanner!: string[]


}
