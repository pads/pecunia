import { TestBed, inject } from '@angular/core/testing';

import { MonzoEffect } from './monzo.effect';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { Actions } from '@ngrx/effects';
import { ScannedActionsSubject } from '@ngrx/store';

describe('MonzoEffect', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonzoEffect, HttpClient, HttpHandler, Actions, ScannedActionsSubject]
    });
  });

  it('should be created', inject([MonzoEffect], (service: MonzoEffect) => {
    expect(service).toBeTruthy();
  }));
});
