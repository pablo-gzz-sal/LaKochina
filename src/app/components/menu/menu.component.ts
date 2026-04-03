import { Component, OnInit, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { ScrollingBannerComponent } from '../scrolling-banner/scrolling-banner.component';
import { ImageGridComponent } from '../image-grid/image-grid.component';
import { HeaderMobileComponent } from '../header-mobile/header-mobile.component';
import { Router, NavigationEnd } from '@angular/router';
import { filter, switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

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
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {
  constructor(private router: Router, private renderer: Renderer2) {}

  ngOnInit() {
    this.renderer.removeClass(document.body, 'menu-opened');
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        switchMap(() => timer(600))
      )
      .subscribe(() => window.scrollTo(0, 0));
  }

  ngAfterViewInit() {
    setTimeout(() => {
      this.initAnimations();
    }, 100);
  }

  private initAnimations() {
    // Hero bar
    gsap.set('.menu-hero h1', { y: 30, opacity: 0 });
    gsap.set('.menu-hero p', { y: 20, opacity: 0 });
    gsap.timeline({ delay: 0.2 })
      .to('.menu-hero h1', { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
      .to('.menu-hero p', { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3');

    // Farm image overlay
    gsap.set('.farm-label', { y: 15, opacity: 0 });
    gsap.set('.farm-name', { y: 20, opacity: 0 });
    gsap.timeline({ delay: 0.5 })
      .to('.farm-label', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
      .to('.farm-name', { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' }, '-=0.3');

    // Parallax on menu hero image
    gsap.to('.menu-hero-img', {
      yPercent: 15,
      ease: 'none',
      scrollTrigger: {
        trigger: '.menu-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });

    // Menu title + items stagger
    gsap.set('.menu-title', { x: -40, opacity: 0 });
    gsap.set('.menu-item', { x: -30, opacity: 0 });

    gsap.timeline({
      scrollTrigger: { trigger: '.menu-section', start: 'top 70%', once: true }
    })
      .to('.menu-title', { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
      .to('.menu-item', { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, '-=0.4');

    // Catering section
    gsap.set('.catering-title', { x: -40, opacity: 0 });
    gsap.set('.catering-col', { y: 30, opacity: 0 });
    gsap.set('.catering-price-title', { scale: 0.8, opacity: 0 });
    gsap.set('.price-card', { scale: 0.9, opacity: 0 });

    gsap.timeline({
      scrollTrigger: { trigger: '.catering-section', start: 'top 70%', once: true }
    })
      .to('.catering-title', { x: 0, opacity: 1, duration: 0.8, ease: 'power3.out' })
      .to('.catering-col', { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.4)' }, '-=0.4')
      .to('.price-card', { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.6');

    // Catering image parallax
    gsap.to('.catering-img', {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: '.catering-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  }

  ngOnDestroy() {
    ScrollTrigger.getAll().forEach(st => st.kill());
  }
}
