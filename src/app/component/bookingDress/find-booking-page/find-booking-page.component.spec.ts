import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FindBookingPageComponent } from './find-booking-page.component';

describe('FindBookingPageComponent', () => {
  let component: FindBookingPageComponent;
  let fixture: ComponentFixture<FindBookingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FindBookingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FindBookingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
