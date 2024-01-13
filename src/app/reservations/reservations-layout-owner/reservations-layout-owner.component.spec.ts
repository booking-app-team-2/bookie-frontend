import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsLayoutOwnerComponent } from './reservations-layout-owner.component';

describe('ReservationsLayoutOwnerComponent', () => {
  let component: ReservationsLayoutOwnerComponent;
  let fixture: ComponentFixture<ReservationsLayoutOwnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReservationsLayoutOwnerComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReservationsLayoutOwnerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
