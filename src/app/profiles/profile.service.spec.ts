import { TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';
import {HttpClientTestingModule, HttpTestingController, TestRequest} from "@angular/common/http/testing";
import {User} from "./profile/model/user.model";
import {environment} from "../../env/env";
import {testUser} from "./profile/mocks/user.mock";
import {testUserBasicInfo1, testUserBasicInfo2} from "./basic-info-dialog/mocks/user-basic-info.mock";
import {UserBasicInfo} from "./basic-info-dialog/model/user-basic-info.model";
import {testUserAddress1, testUserAddress2} from "./address-dialog/mocks/user-address.mock";
import {UserAddress} from "./address-dialog/model/user-address.model";
import {testUserTelephone1, testUserTelephone2} from "./telephone-dialog/mocks/user-telephone.mock";
import {UserTelephone} from "./telephone-dialog/model/user-telephone.model";
import {testUserPassword1, testUserPassword2} from "./password-change-dialog/mocks/user-password.mock";
import {UserPassword} from "./password-change-dialog/model/user-password.model";

fdescribe('ProfileService', (): void => {
  let service: ProfileService;
  let httpController: HttpTestingController;

  beforeEach((): void => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(ProfileService);
    httpController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => httpController.verify())

  it('should be created', (): void => {
    expect(service).toBeTruthy();
  });

  it('should call get and return testUser', (): void => {
    const id: number = 1;

    service.get(id).subscribe((response: User): void => {
      expect(response).toEqual(testUser);
    })

    const request: TestRequest = httpController.expectOne({
      method: 'GET',
      url: `${environment.apiHost}users/${id}`
    });
    request.flush(testUser);
  });

  it(
    'should call putUserBasicInfo, passing testUserBasicInfo1 and return testUserBasicInfo2',
    (): void => {
      const id: number = 1;

      service.putUserBasicInfo(id, testUserBasicInfo1).subscribe((response: UserBasicInfo): void => {
        expect(response).toEqual(testUserBasicInfo2);
      });

      const request: TestRequest = httpController.expectOne({
        method: 'PUT',
        url: `${environment.apiHost}users/${id}/basic-info`,
      });
      request.flush(testUserBasicInfo2);
    }
  );

  it(
    'should call putUserAddress, passing testUserAddress1 and return testUserAddress2',
    (): void => {
      const id: number = 1;

      service.putUserAddress(id, testUserAddress1).subscribe((response: UserAddress): void => {
        expect(response).toEqual(testUserAddress2);
      });

      const request: TestRequest = httpController.expectOne({
        method: 'PUT',
        url: `${environment.apiHost}users/${id}/address-of-residence`,
      });
      request.flush(testUserAddress2);
    }
  );

  it(
    'should call putUserTelephone, passing testUserTelephone1 and return testUserTelephone2',
    (): void => {
      const id: number = 1;

      service.putUserTelephone(id, testUserTelephone1).subscribe((response: UserTelephone): void => {
        expect(response).toEqual(testUserTelephone2);
      });

      const request: TestRequest = httpController.expectOne({
        method: 'PUT',
        url: `${environment.apiHost}users/${id}/telephone`,
      });
      request.flush(testUserTelephone2);}
  );

  it(
    'should call putUserPassword, passing testUserPassword1 and return testUserPassword2',
    (): void => {
      const id: number = 1;

      service.putUserPassword(id, testUserPassword1).subscribe((response: UserPassword): void => {
        expect(response).toEqual(testUserPassword2);
      });

      const request: TestRequest = httpController.expectOne({
        method: 'PUT',
        url: `${environment.apiHost}users/${id}/password`,
      });
      request.flush(testUserPassword2);
    });
});
