import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DressDetailsPageComponent } from './dress-details-page.component';

describe('DressDetailsPageComponent', () => {
  let component: DressDetailsPageComponent;
  let fixture: ComponentFixture<DressDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DressDetailsPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DressDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
