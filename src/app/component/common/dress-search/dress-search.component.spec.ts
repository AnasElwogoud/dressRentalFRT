import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DressSearchComponent } from './dress-search.component';

describe('RoomSearchComponent', () => {
  let component: DressSearchComponent;
  let fixture: ComponentFixture<DressSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DressSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DressSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
