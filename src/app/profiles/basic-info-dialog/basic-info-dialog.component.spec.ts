import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoDialogComponent } from './basic-info-dialog.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TokenService} from "../../shared/token.service";
import {ProfileService} from "../profile.service";
import {SharedService} from "../../shared/shared.service";
import {of} from "rxjs";
import {testUserBasicInfo2} from "./mocks/user-basic-info.mock";
import {testUser} from "../profile/mocks/user.mock";
import {MaterialModule} from "../../infrastructure/material/material.module";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {By} from "@angular/platform-browser";

fdescribe('BasicInfoDialogComponent', (): void => {
  let component: BasicInfoDialogComponent;
  let fixture: ComponentFixture<BasicInfoDialogComponent>;
  let httpController: HttpTestingController;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;

  beforeEach(async (): Promise<void> => {
    tokenServiceSpy = jasmine.createSpyObj<TokenService>(TokenService.name, {
      'getIdFromToken': 1,
    });

    profileServiceSpy = jasmine.createSpyObj<ProfileService>(ProfileService.name, {
      'putUserBasicInfo': of(testUserBasicInfo2),
    });

    sharedServiceSpy = jasmine.createSpyObj<SharedService>(SharedService.name, ['openSnackBar']);

    await TestBed.configureTestingModule({
      declarations: [BasicInfoDialogComponent],
      imports: [HttpClientTestingModule, MaterialModule, SharedModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: { name: testUser.name, surname: testUser.surname } },
        { provide: TokenService, useValue: tokenServiceSpy },
        { provide: ProfileService, useValue: profileServiceSpy },
        { provide: SharedService, useValue: sharedServiceSpy }
      ]
    })
    .compileComponents();

    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(BasicInfoDialogComponent);
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
    expect(component.userBasicInfoForm.controls['name'].value).toEqual(testUser.name);
    expect(component.userBasicInfoForm.controls['surname'].value).toEqual(testUser.surname);
  });

  it(
    'should have all fields and the cancel button enabled, while the confirm button is disabled until the ' +
    'form is valid',
    (): void => {
      fixture.detectChanges();
      expect(component.userBasicInfoForm.controls['name'].disabled).toBeFalsy();
      expect(component.userBasicInfoForm.controls['surname'].disabled).toBeFalsy();
      component.userBasicInfoForm.controls['name'].setValue('');
      fixture.detectChanges();
      expect(fixture.debugElement.query(By.css('#confirm-button')).nativeElement.disabled).toBeTruthy();
      expect(fixture.debugElement.query(By.css('#cancel-button')).nativeElement.disabled).toBeFalsy();
    }
  );

  it(
    'should should have the form invalid, an error message displayed and the confirm button disabled if ' +
    'any of the input fields are invalid',
    (): void => {
      spyOn(component, 'getNameErrorMessage');
      spyOn(component, 'getSurnameErrorMessage');

      fixture.detectChanges();
      component.userBasicInfoForm.controls['name'].setValue('');
      component.userBasicInfoForm.controls['surname'].setValue('');
      fixture.detectChanges();

      expect(component.getNameErrorMessage).toHaveBeenCalled();
      expect(component.getSurnameErrorMessage).toHaveBeenCalled();
      expect(component.userBasicInfoForm.valid).toBeFalsy();
      expect(fixture.debugElement.query(By.css('#confirm-button')).nativeElement.disabled).toBeTruthy();
    }
  );

  it(
    'should have the form valid and the confirm button enabled if all the field inputs are valid and ' +
    'updateUserBasicInfo should be called',
    (): void => {
      component.userBasicInfoForm.controls['name'].setValue(testUserBasicInfo2.name);
      component.userBasicInfoForm.controls['surname'].setValue(testUserBasicInfo2.surname);
      expect(component.userBasicInfoForm.valid).toBeTruthy();
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('#confirm-button')).nativeElement.disabled).toBeFalsy();
      fixture.debugElement.query(By.css('#confirm-button'))
        .triggerEventHandler('click', null);

      fixture.detectChanges();

      component.updateUserBasicInfo();
      expect(profileServiceSpy.putUserBasicInfo).toHaveBeenCalled();
    }
  );
});
