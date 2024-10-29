import {ComponentFixture, TestBed} from '@angular/core/testing';

import {EditDressPageComponent} from './edit-dress-page.component';

describe('EditDressPageComponent', () => {
  let component: EditDressPageComponent;
  let fixture: ComponentFixture<EditDressPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDressPageComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(EditDressPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
