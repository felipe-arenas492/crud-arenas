import { Routes } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./product-list/product-list'),
  },
  {
    path: 'new',
    loadComponent: () => import('./product-form/product-form'),
  },

  {
    path: 'edit/:idProduct',
    loadComponent: () => import('./product-form/product-form'),
  },
] as Routes;
