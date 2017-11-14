import { AuthService } from './auth.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    AuthService
  ]
})
export class AuthModule { }
