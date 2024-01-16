import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsLayoutComponent } from './reservations-layout.component';

describe('ReservationsLayoutComponent', () => {
  let component: ReservationsLayoutComponent;
  let fixture: ComponentFixture<ReservationsLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationsLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
