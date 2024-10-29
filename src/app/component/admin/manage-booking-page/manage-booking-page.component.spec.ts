import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageBookingPageComponent } from './manage-booking-page.component';

describe('ManageBookingPageComponent', () => {
  let component: ManageBookingPageComponent;
  let fixture: ComponentFixture<ManageBookingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageBookingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageBookingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
