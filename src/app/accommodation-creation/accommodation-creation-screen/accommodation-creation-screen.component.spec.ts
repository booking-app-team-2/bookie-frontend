import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccommodationCreationScreenComponent } from './accommodation-creation-screen.component';

describe('AccommodationCreationScreenComponent', () => {
  let component: AccommodationCreationScreenComponent;
  let fixture: ComponentFixture<AccommodationCreationScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AccommodationCreationScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AccommodationCreationScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
