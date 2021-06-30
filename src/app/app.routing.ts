import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PagesComponent } from '../app/pages/pages.component';
import { ErrorComponent } from '../app/pages/others/errors/error/error.component';
import { NotFoundComponent } from '../app/pages/others/errors/not-found/not-found.component';
import { AuthGuard } from './security/_guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    data: { title: 'Inicio' },
    component: PagesComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/home/home.module').then(m => m.HomeModule)
      },
    ],
  },
  {
    path: 'application-form',
    data: { title: 'Application Form' },
    component: PagesComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/application-form/application-form.module').then(m => m.ApplicationFormModule)
      },
    ],
  },
  {
    path: 'about',
    data: { title: 'Acerca de' },
    component: PagesComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        data: {},
        loadChildren: () => import('src/app/pages/about/about.module').then(m => m.AboutModule)
      },
    ],
  },

  // ------------------------------------------------- Redirect Routes
  {
    path: 'inicio', redirectTo: 'home', pathMatch: 'full'
  },
  {
    path: 'acerca', redirectTo: 'about', pathMatch: 'full'
  },

  // ------------------------------------------------- Other Modules
  {
    path: 'blank',
    data: { title: 'En Blanco' },
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/others/blank/blank.module').then(m => m.BlankModule)
      },
    ],
  },

  // Login
  {
    path: 'login',
    loadChildren: () => import('src/app/security/login/login.module').then(m => m.LoginModule)
  },


  // Additionals
  { path: 'error', component: ErrorComponent, data: { title: 'Error' } },
  { path: '**', component: NotFoundComponent, data: { title: 'Página no encontrada' } },
];

export const routing: ModuleWithProviders = RouterModule.forRoot(routes, {
  preloadingStrategy: PreloadAllModules,
  relativeLinkResolution: 'legacy'
});
