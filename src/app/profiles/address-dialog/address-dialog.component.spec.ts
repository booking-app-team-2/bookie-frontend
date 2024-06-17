import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressDialogComponent } from './address-dialog.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TokenService} from "../../shared/token.service";
import {ProfileService} from "../profile.service";
import {SharedService} from "../../shared/shared.service";
import {of} from "rxjs";
import {testUserAddress2} from "./mocks/user-address.mock";
import {MaterialModule} from "../../infrastructure/material/material.module";
import {SharedModule} from "../../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {testUser} from "../profile/mocks/user.mock";
import {By} from "@angular/platform-browser";

fdescribe('AddressDialogComponent', (): void => {
  let component: AddressDialogComponent;
  let fixture: ComponentFixture<AddressDialogComponent>;
  let httpController: HttpTestingController;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;

  beforeEach(async (): Promise<void> => {
    tokenServiceSpy = jasmine.createSpyObj<TokenService>(TokenService.name, {
      'getIdFromToken': 1,
    });

    profileServiceSpy = jasmine.createSpyObj<ProfileService>(ProfileService.name, {
      'putUserAddress': of(testUserAddress2),
    });

    sharedServiceSpy = jasmine.createSpyObj<SharedService>(SharedService.name, ['openSnackBar']);

    await TestBed.configureTestingModule({
      declarations: [AddressDialogComponent],
      imports: [HttpClientTestingModule, MaterialModule, SharedModule, ReactiveFormsModule, BrowserAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
        { provide: MAT_DIALOG_DATA, useValue: { address: testUser.addressOfResidence } },
        { provide: TokenService, useValue: tokenServiceSpy },
        { provide: ProfileService, useValue: profileServiceSpy },
        { provide: SharedService, useValue: sharedServiceSpy }
      ],
    })
    .compileComponents();

    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(AddressDialogComponent);
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
    expect(component.userAddressForm.controls['address'].value).toEqual(testUser.addressOfResidence);
  });

  it(
    'should have all fields and the cancel button enabled, while the confirm button is disabled until the ' +
    'form is valid',
    (): void => {
      fixture.detectChanges();
      expect(component.userAddressForm.controls['address'].disabled).toBeFalsy();
      component.userAddressForm.controls['address'].setValue('');
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
      component.userAddressForm.controls['address'].setValue('');
      fixture.detectChanges();

      expect(component.getErrorMessage).toHaveBeenCalled();
      expect(component.userAddressForm.valid).toBeFalsy();
      expect(fixture.debugElement.query(By.css('#confirm-button')).nativeElement.disabled).toBeTruthy();
    }
  );

  it(
    'should have the form valid and the confirm button enabled if all the field inputs are valid and ' +
    'updateUserAddress should be called',
    (): void => {
      component.userAddressForm.controls['address'].setValue(testUserAddress2.addressOfResidence);
      expect(component.userAddressForm.valid).toBeTruthy();
      fixture.detectChanges();

      expect(fixture.debugElement.query(By.css('#confirm-button')).nativeElement.disabled).toBeFalsy();
      fixture.debugElement.query(By.css('#confirm-button'))
        .triggerEventHandler('click', null);

      fixture.detectChanges();

      component.updateUserAddress();
      expect(profileServiceSpy.putUserAddress).toHaveBeenCalled();
    }
  );
});
