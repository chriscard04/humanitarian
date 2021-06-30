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
    path: 'historia-cultura-tradicion',
    data: { title: 'Historia, Cultura y Tradición' },
    component: PagesComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/historia/historia.module').then(m => m.HistoriaModule)
      },
    ],
  },
  /* {
    path: 'personalidades',
    data: { title: 'Personalidades' },
    component: PagesComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/personalidades/personalidades.module').then(m => m.PersonalidadesModule)
      },
    ],
  },
  {
    path: 'turismo',
    data: { title: 'Turismo' },
    component: PagesComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/turismo/turismo.module').then(m => m.TurismoModule)
      },
    ],
  }, */
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
  {
    path: 'dataset-list',
    data: { title: 'dataset List' },
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/dataset-list/dataset-list.module').then(m => m.DataSetListModule)
      },
    ],
  },
  {
    path: 'beneficiaries-list',
    data: { title: 'Beneficiaries List' },
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/beneficiaries-list/beneficiaries-list.module').then(m => m.BeneficiariesListModule)
      },
    ],
  },
  {
    path: 'evaluation',
    data: { title: 'Evaluation' },
    component: PagesComponent,
    // canActivate: [AuthGuard],
    children: [
      {
        path: '',
        loadChildren: () => import('src/app/pages/beneficiaries-evaluation/ben-evaluation.module').then(m => m.BenEvaluationModule)
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
