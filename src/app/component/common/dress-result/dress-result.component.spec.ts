import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DressResultComponent } from './dress-result.component';

describe('RoomResultComponent', () => {
  let component: DressResultComponent;
  let fixture: ComponentFixture<DressResultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DressResultComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DressResultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
