import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationUpdatingComponent } from './accommodation-updating.component';

describe('AccommodationUpdatingComponent', () => {
  let component: AccommodationUpdatingComponent;
  let fixture: ComponentFixture<AccommodationUpdatingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccommodationUpdatingComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationUpdatingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
