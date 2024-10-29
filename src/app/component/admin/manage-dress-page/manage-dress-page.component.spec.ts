import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDressPageComponent } from './manage-dress-page.component';

describe('ManageDressPageComponent', () => {
  let component: ManageDressPageComponent;
  let fixture: ComponentFixture<ManageDressPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ManageDressPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
