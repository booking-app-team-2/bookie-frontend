import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangeDialogComponent } from './password-change-dialog.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

fdescribe('PasswordChangeDialogComponent', (): void => {
  let component: PasswordChangeDialogComponent;
  let fixture: ComponentFixture<PasswordChangeDialogComponent>;
  let httpController: HttpTestingController;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [PasswordChangeDialogComponent],
      imports: [HttpClientTestingModule],
    })
    .compileComponents();

    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(PasswordChangeDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => httpController.verify())

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });
});
