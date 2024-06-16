import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddressDialogComponent } from './address-dialog.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {MatDialogRef} from "@angular/material/dialog";

fdescribe('AddressDialogComponent', (): void => {
  let component: AddressDialogComponent;
  let fixture: ComponentFixture<AddressDialogComponent>;
  let httpController: HttpTestingController;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [AddressDialogComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
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
});
