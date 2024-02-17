import {
    trigger,
    state,
    style,
    animate,
    transition,
  } from '@angular/animations';
  
  export const burgerMenuAnimation = trigger('burgerMenuAnimation', [
    state('open', style({ transform: 'translateX(0)' })),
    state('closed', style({ transform: 'translateX(-100%)' })),
    transition('closed <=> open', animate('0.3s ease-in-out')),
  ]);