import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomMessageBoxDialogComponent } from './custom-message-box-dialog.component';

describe('CustomMessageBoxDialogComponent', () => {
  let component: CustomMessageBoxDialogComponent;
  let fixture: ComponentFixture<CustomMessageBoxDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CustomMessageBoxDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CustomMessageBoxDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
