import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangeDialogComponent } from './password-change-dialog.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TokenService} from "../../shared/token.service";
import {ProfileService} from "../profile.service";
import {SharedService} from "../../shared/shared.service";
import {of} from "rxjs";
import {testUserPassword2} from "./mocks/user-password.mock";
import {MatDialogRef} from "@angular/material/dialog";
import {MaterialModule} from "../../infrastructure/material/material.module";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {By} from "@angular/platform-browser";

fdescribe('PasswordChangeDialogComponent', (): void => {
  let component: PasswordChangeDialogComponent;
  let fixture: ComponentFixture<PasswordChangeDialogComponent>;
  let httpController: HttpTestingController;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;

  beforeEach(async (): Promise<void> => {
    tokenServiceSpy = jasmine.createSpyObj<TokenService>(TokenService.name, {
      'getIdFromToken': 1,
    });

    profileServiceSpy = jasmine.createSpyObj<ProfileService>(ProfileService.name, {
      'putUserPassword': of(testUserPassword2),
    });

    sharedServiceSpy = jasmine.createSpyObj<SharedService>(SharedService.name, ['openSnackBar']);

    await TestBed.configureTestingModule({
      declarations: [PasswordChangeDialogComponent],
      imports: [HttpClientTestingModule, MaterialModule, SharedModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: TokenService, useValue: tokenServiceSpy },
        { provide: ProfileService, useValue: profileServiceSpy },
        { provide: SharedService, useValue: sharedServiceSpy }
      ],
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

  it('should get the user id upon being loaded', (): void => {
    fixture.detectChanges();
    expect(tokenServiceSpy.getIdFromToken).toHaveBeenCalledTimes(1);
  });

  it(
    'should have all fields and the cancel button enabled, while the confirm button is disabled until the ' +
    'form is valid',
    (): void => {
      fixture.detectChanges();
      expect(component.userPasswordForm.controls['currentPassword'].disabled).toBeFalsy();
      expect(component.userPasswordForm.controls['newPassword'].disabled).toBeFalsy();
      component.userPasswordForm.controls['currentPassword'].setValue('');
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#confirm-button')).nativeElement.disabled).toBeTruthy();
      expect(fixture.debugElement.query(By.css('#cancel-button')).nativeElement.disabled).toBeFalsy();
    }
  );

  it(
    'should should have the form invalid, an error message displayed and the confirm button disabled if ' +
    'any of the input fields are invalid',
    (): void => {
      spyOn(component, 'getCurrentPasswordErrorMessage');
      spyOn(component, 'getNewPasswordErrorMessage');

      fixture.detectChanges();
      component.userPasswordForm.controls['currentPassword'].setValue('');
      component.userPasswordForm.controls['newPassword'].setValue('a');
      fixture.detectChanges();

      expect(component.getCurrentPasswordErrorMessage).toHaveBeenCalled();
      expect(component.getNewPasswordErrorMessage).toHaveBeenCalled();
      expect(component.userPasswordForm.valid).toBeFalsy();
      expect(fixture.debugElement.query(By.css('#confirm-button')).nativeElement.disabled).toBeTruthy();
    }
  );

  it(
    'should have the form valid and the confirm button enabled if all the field inputs are valid and ' +
    'updateUserBasicInfo should be called',
    (): void => {
      component.userPasswordForm.controls['currentPassword'].setValue(testUserPassword2.currentPassword);
      component.userPasswordForm.controls['newPassword'].setValue(testUserPassword2.newPassword);
      expect(component.userPasswordForm.valid).toBeTruthy();
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('#confirm-button')).nativeElement.disabled).toBeFalsy();
      fixture.debugElement.query(By.css('#confirm-button'))
        .triggerEventHandler('click', null);

      fixture.detectChanges();

      component.updateUserPassword();
      expect(profileServiceSpy.putUserPassword).toHaveBeenCalled();
    }
  );
});
