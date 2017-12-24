import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatCardModule, MatGridListModule, MatToolbarModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { accountsReducer } from './app.store';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatToolbarModule,
        MatGridListModule,
        MatCardModule,
        StoreModule.forRoot({ accounts: accountsReducer })
      ],
      declarations: [
        AppComponent
      ],
    });

    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app', async(() => {
    expect(component).toBeTruthy();
  }));
});
