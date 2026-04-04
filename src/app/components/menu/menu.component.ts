import { Component, OnInit, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
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
    HeaderMobileComponent,
  ],
})
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {
  private ctx!: gsap.Context;

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
      this.ctx = gsap.context(() => {
        this.initHeroAnimations();
        this.initMenuItemsAnimations();
        this.initCateringAnimations();
      });
      ScrollTrigger.refresh();
    }, 150);
  }

  private initHeroAnimations() {
    gsap.set('.menu-hero-tag', { y: 20, opacity: 0 });
    gsap.set('.menu-hero-title', { y: 50, opacity: 0 });
    gsap.set('.menu-farm-badge', { y: 20, opacity: 0 });

    gsap.timeline({ delay: 0.3 })
      .to('.menu-hero-tag', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' })
      .to('.menu-hero-title', { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.3')
      .to('.menu-farm-badge', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.3');

    // Parallax on hero image
    gsap.to('.menu-hero-img', {
      yPercent: 18,
      ease: 'none',
      scrollTrigger: {
        trigger: '.menu-hero',
        start: 'top top',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  }

  private initMenuItemsAnimations() {
    gsap.set('.menu-items-tag', { y: 15, opacity: 0 });
    gsap.set('.menu-section-title', { y: 40, opacity: 0 });
    gsap.set('.menu-item', { x: -30, opacity: 0 });
    gsap.set('.menu-note', { opacity: 0 });
    gsap.set('.menu-img-panel', { x: 40, opacity: 0 });

    gsap.timeline({
      scrollTrigger: { trigger: '.menu-items-section', start: 'top 70%', once: true }
    })
      .to('.menu-items-tag', { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
      .to('.menu-section-title', { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' }, '-=0.2')
      .to('.menu-item', { x: 0, opacity: 1, duration: 0.5, stagger: 0.08, ease: 'power3.out' }, '-=0.4')
      .to('.menu-note', { opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.2')
      .to('.menu-img-panel', { x: 0, opacity: 1, duration: 0.9, ease: 'back.out(1.3)' }, '-=0.8');

    // Parallax on right image panel
    gsap.to('.menu-panel-img', {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.menu-items-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  }

  private initCateringAnimations() {
    gsap.set('.catering-tag', { y: 15, opacity: 0 });
    gsap.set('.catering-title', { y: 40, opacity: 0 });
    gsap.set('.catering-sub', { y: 20, opacity: 0 });
    gsap.set('.catering-panel', { y: 30, opacity: 0 });
    gsap.set('.catering-price-badge', { scale: 0.85, opacity: 0 });
    gsap.set('.catering-book', { x: 30, opacity: 0 });

    gsap.timeline({
      scrollTrigger: { trigger: '.catering-section', start: 'top 70%', once: true }
    })
      .to('.catering-tag', { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' })
      .to('.catering-title', { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' }, '-=0.2')
      .to('.catering-sub', { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to('.catering-panel', { y: 0, opacity: 1, duration: 0.6, stagger: 0.12, ease: 'back.out(1.4)' }, '-=0.3')
      .to('.catering-price-badge', { scale: 1, opacity: 1, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.4')
      .to('.catering-book', { x: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.5');

    // Catering image band
    gsap.set('.catering-band-title', { y: 30, opacity: 0 });
    gsap.timeline({
      scrollTrigger: { trigger: '.catering-img-band', start: 'top 75%', once: true }
    })
      .to('.catering-band-title', { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out' });

    // Parallax on catering band image
    gsap.to('.catering-band-img', {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: '.catering-img-band',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }

  onBookStand() {
    this.router.navigate(['/contact'], { queryParams: { tab: 'quote' } });
  }
}
