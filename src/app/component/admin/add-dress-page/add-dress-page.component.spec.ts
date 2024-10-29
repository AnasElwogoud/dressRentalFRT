import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDressPageComponent } from './add-dress-page.component';

describe('AddDressPageComponent', () => {
  let component: AddDressPageComponent;
  let fixture: ComponentFixture<AddDressPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDressPageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
