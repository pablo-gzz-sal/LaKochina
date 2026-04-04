import { Component, OnInit, AfterViewInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { FooterComponent } from '../footer/footer.component';
import { HeaderMobileComponent } from '../header-mobile/header-mobile.component';
import { Router, ActivatedRoute } from '@angular/router';
import { ContactService } from 'src/app/services/contact.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Contact, QuoteRequest } from 'src/app/models/contact.model';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  imports: [HeaderComponent, FooterComponent, HeaderMobileComponent, FormsModule, CommonModule],
})
export class ContactComponent implements OnInit, AfterViewInit, OnDestroy {
  activeTab: 'contact' | 'quote' = 'contact';
  contactSuccess = false;
  quoteSuccess = false;
  private ctx!: gsap.Context;

  formData: Contact = { name: '', email: '', message: '' };

  quoteData: QuoteRequest = {
    name: '', email: '', phone: '',
    eventType: '', eventDate: '',
    guestCount: 0, eventLocation: '', message: ''
  };

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
    private contactService: ContactService,
    private el: ElementRef
  ) {}

  ngOnInit() {
    this.renderer.removeClass(document.body, 'menu-opened');

    this.activatedRoute.queryParams.subscribe(params => {
      if (params['tab'] === 'quote') {
        this.activeTab = 'quote';
      }
    });
  }

  ngAfterViewInit() {
    document.documentElement.style.scrollBehavior = 'auto';
    window.scrollTo(0, 0);

    setTimeout(() => {
      this.ctx = gsap.context(() => {
        this.animatePageIn();
        this.animateInfoPanel();
      }, this.el);
      requestAnimationFrame(() => {
        ScrollTrigger.refresh();
        document.documentElement.style.scrollBehavior = '';
      });
    }, 150);
  }

  private animatePageIn() {
    gsap.set('.contact-hero h1', { y: 30, opacity: 0 });
    gsap.set('.contact-hero p', { y: 20, opacity: 0 });
    gsap.set('.tab-switcher', { y: 20, opacity: 0 });

    gsap.timeline({ delay: 0.2 })
      .to('.contact-hero h1', { y: 0, opacity: 1, duration: 0.7, ease: 'power3.out' })
      .to('.contact-hero p', { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.3')
      .to('.tab-switcher', { y: 0, opacity: 1, duration: 0.5, ease: 'power3.out' }, '-=0.2');

    this.animateFormFields();
  }

  private animateFormFields() {
    const fields = document.querySelectorAll('.form-field, .form-heading, .form-sub, .submit-btn');
    gsap.set(fields, { y: 20, opacity: 0 });
    gsap.to(fields, {
      y: 0, opacity: 1,
      duration: 0.5,
      stagger: 0.06,
      ease: 'power3.out',
      delay: 0.4
    });
  }

  private animateInfoPanel() {
    gsap.set('.info-overlay', { y: 30, opacity: 0 });
    gsap.to('.info-overlay', {
      y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.5
    });

    gsap.to('.contact-img', {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.contact-img',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1.5
      }
    });
  }

  setTab(tab: 'contact' | 'quote') {
    if (this.activeTab === tab) return;
    this.activeTab = tab;
    this.contactSuccess = false;
    this.quoteSuccess = false;
    setTimeout(() => this.animateFormFields(), 50);
  }

  submitForm() {
    this.contactService.addContact(this.formData).subscribe(
      () => {
        this.contactSuccess = true;
        this.formData = { name: '', email: '', message: '' };
      },
      (error) => console.error('Error:', error)
    );
  }

  submitQuote() {
    this.contactService.addQuote(this.quoteData).subscribe(
      () => {
        this.quoteSuccess = true;
        this.quoteData = {
          name: '', email: '', phone: '',
          eventType: '', eventDate: '',
          guestCount: 0, eventLocation: '', message: ''
        };
      },
      (error) => console.error('Error:', error)
    );
  }

  ngOnDestroy() {
    this.ctx?.revert();
  }
}
