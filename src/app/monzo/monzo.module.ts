import { MonzoService } from './monzo.service';
import { HttpClientModule } from '@angular/common/http';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    MonzoService
  ]
})
export class MonzoModule { }
