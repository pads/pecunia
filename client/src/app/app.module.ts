import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatCardModule,
  MatGridListModule,
  MatToolbarModule
} from '@angular/material';
import { MonzoModule } from './monzo/monzo.module';
import { AuthModule } from './auth/auth.module';
import { AuthInterceptor } from './auth/auth.interceptor';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { accountsReducer, authenticationReducer, monzoErrorReducer } from './app.store';
import { EffectsModule } from '@ngrx/effects';
import { MonzoEffect } from './monzo/monzo.effect';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AuthService } from './auth/auth.service';
import { AuthEffect } from './auth/auth.effect';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatGridListModule,
    MatCardModule,
    StoreModule.forRoot({
      accounts: accountsReducer,
      authentication: authenticationReducer,
      monzoError: monzoErrorReducer
    }),
    EffectsModule.forRoot([AuthEffect, MonzoEffect]),
    StoreDevtoolsModule.instrument({ maxAge: 25 }),
    AuthModule,
    MonzoModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
