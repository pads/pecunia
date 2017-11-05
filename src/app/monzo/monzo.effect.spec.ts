import { TestBed, inject } from '@angular/core/testing';

import { MonzoEffect } from './monzo.effect';

describe('MonzoEffect', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MonzoEffect]
    });
  });

  it('should be created', inject([MonzoEffect], (service: MonzoEffect) => {
    expect(service).toBeTruthy();
  }));
});
