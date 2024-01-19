import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnapprovedReviewsComponent } from './unapproved-reviews.component';

describe('UnapprovedReviewsComponent', () => {
  let component: UnapprovedReviewsComponent;
  let fixture: ComponentFixture<UnapprovedReviewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UnapprovedReviewsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnapprovedReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
