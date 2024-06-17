import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileComponent } from './profile.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {MaterialModule} from "../../infrastructure/material/material.module";
import {ProfileService} from "../profile.service";
import {Observable, of} from "rxjs";
import {testUser} from "./mocks/user.mock";
import {SharedModule} from "../../shared/shared.module";
import {TokenService} from "../../shared/token.service";
import {By} from "@angular/platform-browser";
import {MatDialogRef} from "@angular/material/dialog";
import Spy = jasmine.Spy;
import {BasicInfoDialogComponent} from "../basic-info-dialog/basic-info-dialog.component";
import {TelephoneDialogComponent} from "../telephone-dialog/telephone-dialog.component";
import {AddressDialogComponent} from "../address-dialog/address-dialog.component";
import {PasswordChangeDialogComponent} from "../password-change-dialog/password-change-dialog.component";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {SharedService} from "../../shared/shared.service";

fdescribe('ProfileComponent', (): void => {
  let component: ProfileComponent;
  let fixture: ComponentFixture<ProfileComponent>;
  let httpController: HttpTestingController;
  let tokenServiceSpy: jasmine.SpyObj<TokenService>;
  let profileServiceSpy: jasmine.SpyObj<ProfileService>;
  let sharedServiceSpy: jasmine.SpyObj<SharedService>;

  beforeEach(async (): Promise<void> => {
    tokenServiceSpy = jasmine.createSpyObj<TokenService>(TokenService.name, {
      'getIdFromToken': 1,
    });

    profileServiceSpy = jasmine.createSpyObj<ProfileService>(ProfileService.name, {
      'get': of(testUser),
    });

    sharedServiceSpy = jasmine.createSpyObj<SharedService>(SharedService.name, ['openSnackBar']);

    await TestBed.configureTestingModule({
      declarations: [ProfileComponent],
      imports: [HttpClientTestingModule, MaterialModule, SharedModule, BrowserAnimationsModule],
      providers: [
        { provide: TokenService, useValue: tokenServiceSpy },
        { provide: ProfileService, useValue: profileServiceSpy },
        { provide: SharedService, useValue: sharedServiceSpy }
      ],
    })
    .compileComponents();

    httpController = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => httpController.verify())

  it('should create', (): void => {
    expect(component).toBeTruthy();
  });

  function checkUser(): void {
    expect(component.user).toBe(testUser);
    expect(fixture.debugElement.query(By.css('#username-value')).nativeElement.textContent)
      .toBe(testUser.username);
    expect(
      fixture
        .debugElement
        .query(By.css('#name-holder'))
        .nativeElement
        .textContent
        .substring(0, testUser.name.length)
    )
      .toBe(testUser.name);
    expect(fixture.debugElement.query(By.css('#surname-value')).nativeElement.textContent)
      .toBe(testUser.surname);
    expect(fixture.debugElement.query(By.css('#address-value')).nativeElement.textContent)
      .toBe(testUser.addressOfResidence);
    expect(fixture.debugElement.query(By.css('#telephone-value')).nativeElement.textContent)
      .toBe(testUser.telephone);
  }

  it('should input the user data upon being loaded', (): void => {
    fixture.detectChanges();
    expect(tokenServiceSpy.getIdFromToken).toHaveBeenCalledTimes(1);
    expect(profileServiceSpy.get).toHaveBeenCalledTimes(1);
    checkUser();
  });

  it(
    'should open the change basic info dialog and reinput the user data upon closing it',
    (): void => {
      const openDialogSpy: Spy = spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: (): Observable<any> => of(true)
      } as MatDialogRef<ProfileComponent>);

      component.openChangeBasicInfoDialog('250ms', '250ms');

      expect(openDialogSpy).toHaveBeenCalledWith(BasicInfoDialogComponent, {
        data: {
          name: testUser.name,
          surname: testUser.surname,
        },
        enterAnimationDuration: '250ms',
        exitAnimationDuration: '250ms',
      });

      fixture.detectChanges();
      expect(tokenServiceSpy.getIdFromToken).toHaveBeenCalledTimes(1);
      expect(profileServiceSpy.get).toHaveBeenCalledTimes(2);
      checkUser();
    }
  );

  it(
    'should open the change contact info dialog and reinput the user data upon closing it',
    (): void => {
      const openDialogSpy: Spy = spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: (): Observable<any> => of(true)
      } as MatDialogRef<ProfileComponent>);

      component.openChangeContactInfoDialog('250ms', '250ms');

      expect(openDialogSpy).toHaveBeenCalledWith(TelephoneDialogComponent, {
        data: {
          telephone: testUser.telephone,
        },
        enterAnimationDuration: '250ms',
        exitAnimationDuration: '250ms',
      });

      fixture.detectChanges();
      expect(tokenServiceSpy.getIdFromToken).toHaveBeenCalledTimes(1);
      expect(profileServiceSpy.get).toHaveBeenCalledTimes(2);
      checkUser();
    }
  );

  it('should open the change address dialog and reinput the user data upon closing it', (): void => {
    const openDialogSpy: Spy = spyOn(component.dialog, 'open').and.returnValue({
      afterClosed: (): Observable<any> => of(true)
    } as MatDialogRef<ProfileComponent>);

    component.openChangeAddressDialog('250ms', '250ms');

    expect(openDialogSpy).toHaveBeenCalledWith(AddressDialogComponent, {
      data: {
        address: testUser.addressOfResidence,
      },
      enterAnimationDuration: '250ms',
      exitAnimationDuration: '250ms',
    });

    fixture.detectChanges();
    expect(tokenServiceSpy.getIdFromToken).toHaveBeenCalledTimes(1);
    expect(profileServiceSpy.get).toHaveBeenCalledTimes(2);
    checkUser();
  });

  it(
    'should open the change password dialog and reinput the user data upon closing it',
    (): void => {
      const openDialogSpy: Spy = spyOn(component.dialog, 'open').and.returnValue({
        afterClosed: (): Observable<any> => of(true)
      } as MatDialogRef<ProfileComponent>);

      component.openChangePasswordDialog('250ms', '250ms');

      expect(openDialogSpy).toHaveBeenCalledWith(PasswordChangeDialogComponent, {
        enterAnimationDuration: '250ms',
        exitAnimationDuration: '250ms',
      });

      fixture.detectChanges();
      expect(tokenServiceSpy.getIdFromToken).toHaveBeenCalledTimes(1);
      expect(profileServiceSpy.get).toHaveBeenCalledTimes(2);
      checkUser();
      expect(sharedServiceSpy.openSnackBar).toHaveBeenCalledWith('Password successfully changed.');
    }
  );
});
