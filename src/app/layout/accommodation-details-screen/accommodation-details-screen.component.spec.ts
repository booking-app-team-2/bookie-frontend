import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationDetailsScreenComponent } from './accommodation-details-screen.component';

describe('AccommodationDetailsScreenComponent', () => {
  let component: AccommodationDetailsScreenComponent;
  let fixture: ComponentFixture<AccommodationDetailsScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccommodationDetailsScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationDetailsScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
