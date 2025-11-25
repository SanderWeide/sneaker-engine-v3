import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('./components/home/home.component').then(m => m.HomeComponent),
  },
  {
    path: 'login',
    loadComponent: () => import('./components/auth/login/login.component').then(m => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./components/auth/register/register.component').then(m => m.RegisterComponent),
  },
  {
    path: 'sneakers',
    canActivate: [authGuard],
    loadComponent: () => import('./components/sneakers/sneaker-list/sneaker-list.component').then(m => m.SneakerListComponent),
  },
  {
    path: 'sneakers/:id',
    canActivate: [authGuard],
    loadComponent: () => import('./components/sneakers/sneaker-detail/sneaker-detail.component').then(m => m.SneakerDetailComponent),
  },
  {
    path: 'propositions',
    canActivate: [authGuard],
    loadComponent: () => import('./components/propositions/proposition-list/proposition-list.component').then(m => m.PropositionListComponent),
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
