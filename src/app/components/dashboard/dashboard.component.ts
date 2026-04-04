import { Component, OnInit, AfterViewInit, OnDestroy, Renderer2 } from '@angular/core';
import { FooterComponent } from "../footer/footer.component";
import { HeaderComponent } from "../header/header.component";
import { ScrollingBannerComponent } from "../scrolling-banner/scrolling-banner.component";
import { Router, NavigationEnd } from '@angular/router';
import { HeaderMobileComponent } from "../header-mobile/header-mobile.component";
import { filter, switchMap } from 'rxjs/operators';
import { timer } from 'rxjs';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
    selector: 'app-dashboard',
    standalone: true,
    templateUrl: './dashboard.component.html',
    styleUrl: './dashboard.component.scss',
    imports: [FooterComponent, HeaderComponent, ScrollingBannerComponent, HeaderMobileComponent]
})
export class DashboardComponent implements OnInit, AfterViewInit, OnDestroy {

  infoBannerInsta!: string[];

  constructor(private route: Router, private renderer: Renderer2) {}

  ngOnInit() {
    this.infoBannerInsta = ['FOLLOW US: @LAKOCHINA512'];
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

  ngAfterViewInit() {
    // Small delay so DOM is fully painted
    setTimeout(() => {
      this.initHeroAnimations();
      this.initScrollAnimations();
      this.initHireStandAnimations();
      this.initFounderAnimations();
    }, 100);
  }

  private initHeroAnimations() {
    // Set initial states
    gsap.set('.hero-tag', { y: 20, opacity: 0 });
    gsap.set('.hero-line', { y: 60, opacity: 0 });
    gsap.set('.hero-sub', { y: 30, opacity: 0 });
    gsap.set('.hero-btns', { y: 30, opacity: 0 });
    gsap.set('.hero-food-img', { x: 60, opacity: 0 });
    gsap.set('.scroll-indicator', { opacity: 0 });

    const tl = gsap.timeline({ delay: 0.3 });

    tl.to('.hero-tag', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .to('.hero-line', { opacity: 1, y: 0, duration: 0.8, stagger: 0.15, ease: 'power3.out' }, '-=0.3')
      .to('.hero-sub', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .to('.hero-btns', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.2')
      .to('.hero-food-img', { opacity: 1, x: 0, duration: 1, ease: 'power3.out' }, '-=0.8')
      .to('.scroll-indicator', { opacity: 1, duration: 0.6 }, '-=0.2');

    // Parallax on hero background image
    gsap.to('.hero-bg-img', {
      yPercent: 20,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: 1
      }
    });

    // Hero image card gentle float
    gsap.to('.hero-img-card', {
      y: -15,
      duration: 2.5,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true
    });
  }

  private initScrollAnimations() {
    // Initial states for dish sections
    gsap.set('.dish-title', { y: 40, opacity: 0 });
    gsap.set('.dish-img', { y: 30, scale: 0.95, opacity: 0 });
    gsap.set('.dish-panel-tag', { y: 15, opacity: 0 });
    gsap.set('.dish-tags', { y: 15, opacity: 0 });
    gsap.set('.dish-desc-title', { x: 50, opacity: 0 });
    gsap.set('.dish-desc-sub', { x: 30, opacity: 0 });
    gsap.set('.dish-desc-text', { x: 30, opacity: 0 });
    gsap.set('.dish-stats', { x: 20, opacity: 0 });
    gsap.set('.dish-btn', { y: 16, opacity: 0 });

    // Cochinita section
    gsap.timeline({
      scrollTrigger: { trigger: '.cochinita-section', start: 'top 75%', once: true }
    })
      .to('.cochinita-section .dish-panel-tag', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      .to('.cochinita-section .dish-title', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
      .to('.cochinita-section .dish-img', { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.4)' }, '-=0.4')
      .to('.cochinita-section .dish-tags', { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.3')
      .to('.cochinita-section .dish-desc-sub', { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, '-=0.6')
      .to('.cochinita-section .dish-desc-title', { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .to('.cochinita-section .dish-desc-text', { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to('.cochinita-section .dish-stats', { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .to('.cochinita-section .dish-btn', { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.2');

    // Chicharron section
    gsap.timeline({
      scrollTrigger: { trigger: '.chicharron-section', start: 'top 75%', once: true }
    })
      .to('.chicharron-section .dish-panel-tag', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' })
      .to('.chicharron-section .dish-title', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
      .to('.chicharron-section .dish-img', { opacity: 1, y: 0, scale: 1, duration: 0.9, ease: 'back.out(1.4)' }, '-=0.4')
      .to('.chicharron-section .dish-tags', { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.3')
      .to('.chicharron-section .dish-desc-sub', { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, '-=0.6')
      .to('.chicharron-section .dish-desc-title', { opacity: 1, x: 0, duration: 0.7, ease: 'power3.out' }, '-=0.3')
      .to('.chicharron-section .dish-desc-text', { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to('.chicharron-section .dish-stats', { opacity: 1, x: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .to('.chicharron-section .dish-btn', { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.2');

    // Market section initial states
    gsap.set('.market-tag', { y: 15, opacity: 0 });
    gsap.set('.market-title', { y: 40, opacity: 0 });
    gsap.set('.market-address', { x: -20, opacity: 0 });
    gsap.set('.market-hours', { x: -20, opacity: 0 });
    gsap.set('.market-btn-wrap', { y: 20, opacity: 0 });
    gsap.set('.market-badge', { y: 20, opacity: 0 });

    gsap.to('.market-img', {
      scale: 1.08,
      ease: 'none',
      scrollTrigger: {
        trigger: '.market-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });

    gsap.timeline({
      scrollTrigger: { trigger: '.market-section', start: 'top 70%', once: true }
    })
      .to('.market-badge', { opacity: 1, y: 0, duration: 0.7, ease: 'back.out(1.5)' })
      .to('.market-tag', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to('.market-title', { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=0.2')
      .to('.market-address', { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to('.market-hours', { opacity: 1, x: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to('.market-btn-wrap', { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.7)' }, '-=0.2');
  }

  private initHireStandAnimations() {
    gsap.set('.hire-tag', { y: 20, opacity: 0 });
    gsap.set('.hire-title', { y: 50, opacity: 0 });
    gsap.set('.hire-desc', { y: 30, opacity: 0 });
    gsap.set('.hire-cta', { y: 20, opacity: 0 });
    gsap.set('.price-badge', { scale: 0.8, opacity: 0 });
    gsap.set('.feature-card', { y: 30, opacity: 0 });

    gsap.timeline({
      scrollTrigger: { trigger: '.hire-section', start: 'top 70%', once: true }
    })
      .to('.hire-tag', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .to('.hire-title', { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out' }, '-=0.3')
      .to('.hire-desc', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.3')
      .to('.feature-card', { opacity: 1, y: 0, duration: 0.6, stagger: 0.15, ease: 'back.out(1.5)' }, '-=0.2')
      .to('.hire-cta', { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.2')
      .to('.price-badge', { opacity: 1, scale: 1, duration: 0.8, ease: 'back.out(1.7)' }, '-=0.5');

    // Animated stat counters
    ScrollTrigger.create({
      trigger: '.hire-stats',
      start: 'top 80%',
      once: true,
      onEnter: () => {
        this.animateCounter('.stat-events', 500);
        this.animateCounter('.stat-years', 5);
        this.animateCounter('.stat-guests', 300);
      }
    });

    // Parallax on hire section image
    gsap.to('.hire-img', {
      yPercent: 12,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hire-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 2
      }
    });
  }

  private initFounderAnimations() {
    gsap.set('.founder-pre', { y: 20, opacity: 0 });
    gsap.set('.founder-quote', { y: 40, opacity: 0 });
    gsap.set('.founder-attr', { y: 20, opacity: 0 });
    gsap.set('.founder-cred-inline', { y: 15, opacity: 0 });
    gsap.set('.founder-img', { x: -40, opacity: 0 });
    gsap.set('.founder-badge', { scale: 0.8, opacity: 0 });
    gsap.set('.founder-text', { x: 30, opacity: 0 });
    gsap.set('.founder-pills', { y: 20, opacity: 0 });
    gsap.set('.founder-btn', { y: 20, opacity: 0 });

    gsap.timeline({
      scrollTrigger: { trigger: '.founder-section', start: 'top 70%', once: true }
    })
      .to('.founder-pre', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
      .to('.founder-quote', { opacity: 1, y: 0, duration: 1, ease: 'power3.out' }, '-=0.3')
      .to('.founder-attr', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
      .to('.founder-cred-inline', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to('.founder-img', { opacity: 1, x: 0, duration: 0.9, ease: 'power3.out' }, '-=0.5')
      .to('.founder-badge', { opacity: 1, scale: 1, duration: 0.7, ease: 'back.out(1.7)' }, '-=0.3')
      .to('.founder-text', { opacity: 1, x: 0, duration: 0.7, stagger: 0.2, ease: 'power3.out' }, '-=0.6')
      .to('.founder-pills', { opacity: 1, y: 0, duration: 0.5, ease: 'back.out(1.5)' }, '-=0.3')
      .to('.founder-btn', { opacity: 1, y: 0, duration: 0.6, ease: 'back.out(1.5)' }, '-=0.2');
  }

  private animateCounter(selector: string, target: number) {
    const el = document.querySelector(selector);
    if (!el) return;
    const obj = { val: 0 };
    gsap.to(obj, {
      val: target,
      duration: 2,
      ease: 'power2.out',
      onUpdate: () => {
        el.textContent = Math.round(obj.val) + '+';
      }
    });
  }

  ngOnDestroy() {
    ScrollTrigger.getAll().forEach(st => st.kill());
  }

  onContact() {
    this.route.navigate(['/contact']);
  }

  onMenu() {
    this.route.navigate(['/menu']);
  }

  onBookStand() {
    this.route.navigate(['/contact'], { queryParams: { tab: 'quote' } });
  }
}
