import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephoneDialogComponent } from './telephone-dialog.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {TokenService} from "../../shared/token.service";
import {ProfileService} from "../profile.service";
import {SharedService} from "../../shared/shared.service";
import {of} from "rxjs";
import {testUserTelephone2} from "./mocks/user-telephone.mock";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {testUser} from "../profile/mocks/user.mock";
import {MaterialModule} from "../../infrastructure/material/material.module";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {By} from "@angular/platform-browser";

fdescribe('TelephoneDialogComponent', (): void => {
  let component: TelephoneDialogComponent;
  let fixture: ComponentFixture<TelephoneDialogComponent>;
  let httpController: HttpTestingController;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;

  beforeEach(async (): Promise<void> => {
    tokenServiceSpy = jasmine.createSpyObj<TokenService>(TokenService.name, {
      'getIdFromToken': 1,
    });

    profileServiceSpy = jasmine.createSpyObj<ProfileService>(ProfileService.name, {
      'putUserTelephone': of(testUserTelephone2),
    });

    sharedServiceSpy = jasmine.createSpyObj<SharedService>(SharedService.name, ['openSnackBar']);

    await TestBed.configureTestingModule({
      declarations: [TelephoneDialogComponent],
      imports: [HttpClientTestingModule, MaterialModule, SharedModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: { telephone: testUser.telephone } },
        { provide: TokenService, useValue: tokenServiceSpy },
        { provide: ProfileService, useValue: profileServiceSpy },
        { provide: SharedService, useValue: sharedServiceSpy }
      ],
    })
    .compileComponents();

    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(TelephoneDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => httpController.verify())

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  it('should input the user data upon being loaded', (): void => {
    fixture.detectChanges();
    expect(tokenServiceSpy.getIdFromToken).toHaveBeenCalledTimes(1);
    expect(component.userTelephoneForm.controls['telephone'].value).toEqual(testUser.telephone);
  });

  it(
    'should have all fields and the cancel button enabled, while the confirm button is disabled until the ' +
    'form is valid',
    (): void => {
      fixture.detectChanges();
      expect(component.userTelephoneForm.controls['telephone'].disabled).toBeFalsy();
      component.userTelephoneForm.controls['telephone'].setValue('');
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#confirm-button')).nativeElement.disabled).toBeTruthy();
      expect(fixture.debugElement.query(By.css('#cancel-button')).nativeElement.disabled).toBeFalsy();
    }
  );

  it(
    'should should have the form invalid, an error message displayed and the confirm button disabled if ' +
    'any of the input fields are invalid',
    (): void => {
      spyOn(component, 'getErrorMessage');

      fixture.detectChanges();
      component.userTelephoneForm.controls['telephone'].setValue('');
      fixture.detectChanges();

      expect(component.getErrorMessage).toHaveBeenCalled();
      expect(component.userTelephoneForm.valid).toBeFalsy();
      expect(fixture.debugElement.query(By.css('#confirm-button')).nativeElement.disabled).toBeTruthy();
    }
  );

  it(
    'should have the form valid and the confirm button enabled if all the field inputs are valid and ' +
    'updateUserTelephone should be called',
    (): void => {
      component.userTelephoneForm.controls['telephone'].setValue(testUserTelephone2.telephone);
      expect(component.userTelephoneForm.valid).toBeTruthy();
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('#confirm-button')).nativeElement.disabled).toBeFalsy();
      fixture.debugElement.query(By.css('#confirm-button'))
        .triggerEventHandler('click', null);

      fixture.detectChanges();

      component.updateUserTelephone();
      expect(profileServiceSpy.putUserTelephone).toHaveBeenCalled();
    }
  );
});
