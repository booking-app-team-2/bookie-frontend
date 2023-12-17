import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephoneDialogComponent } from './telephone-dialog.component';

describe('TelephoneDialogComponent', () => {
  let component: TelephoneDialogComponent;
  let fixture: ComponentFixture<TelephoneDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TelephoneDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TelephoneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
