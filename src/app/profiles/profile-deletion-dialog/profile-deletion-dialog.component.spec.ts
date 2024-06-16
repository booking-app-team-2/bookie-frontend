import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDeletionDialogComponent } from './profile-deletion-dialog.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

fdescribe('ProfileDeletionDialogComponent', (): void => {
  let component: ProfileDeletionDialogComponent;
  let fixture: ComponentFixture<ProfileDeletionDialogComponent>;
  let httpController: HttpTestingController;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [ProfileDeletionDialogComponent],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();

    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ProfileDeletionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => httpController.verify())

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
