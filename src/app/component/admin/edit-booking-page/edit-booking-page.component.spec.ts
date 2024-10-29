import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBookingPageComponent } from './edit-booking-page.component';

describe('EditBookingPageComponent', () => {
  let component: EditBookingPageComponent;
  let fixture: ComponentFixture<EditBookingPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditBookingPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditBookingPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
