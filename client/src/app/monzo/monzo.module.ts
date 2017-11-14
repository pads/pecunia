import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MonzoEffect } from './monzo.effect';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    MonzoEffect
  ]
})
export class MonzoModule { }
