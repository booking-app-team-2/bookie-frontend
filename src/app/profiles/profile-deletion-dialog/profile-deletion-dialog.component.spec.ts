import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDeletionDialogComponent } from './profile-deletion-dialog.component';

describe('ProfileDeletionDialogComponent', () => {
  let component: ProfileDeletionDialogComponent;
  let fixture: ComponentFixture<ProfileDeletionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileDeletionDialogComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileDeletionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
