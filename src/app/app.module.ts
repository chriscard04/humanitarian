import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { SharedModule } from '../shared/shared.module';
import { PagesComponent } from './pages/pages.component';
import { NotFoundComponent } from './pages/others/errors/not-found/not-found.component';
import { ErrorComponent } from './pages/others/errors/error/error.component';

import { routing } from './app.routing';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppSettings } from './app.settings';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// import { TuneInComponent } from './pages/tune-in/tune-in.component';
import { WebApi } from './security/_services/service';
import { ErrorInterceptor, JwtInterceptor } from './security/_helpers';
import { UserMenuComponent } from 'src/theme/user-menu/user-menu.component';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule.forRoot(),

    AppRoutingModule,
    routing,
    /*     GtagModule.forRoot({ trackingId: 'G-3310F7ZJRS', trackPageviews: false }) */

  ],
  declarations: [
    AppComponent,
    PagesComponent,
    ErrorComponent,
    NotFoundComponent,
    // TuneInComponent,

    UserMenuComponent,


  ],

  providers: [
    AppSettings,
    WebApi,

    // Authentication providers
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
