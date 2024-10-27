import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDressesPageComponent } from './all-dresses-page.component';

describe('AllDressesPageComponent', () => {
  let component: AllDressesPageComponent;
  let fixture: ComponentFixture<AllDressesPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AllDressesPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AllDressesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
