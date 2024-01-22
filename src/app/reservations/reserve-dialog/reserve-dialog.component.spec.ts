import {ComponentFixture, fakeAsync, TestBed, tick,async} from '@angular/core/testing';
import {ReactiveFormsModule} from "@angular/forms";
import { ReserveDialogComponent } from './reserve-dialog.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MaterialModule} from "../../infrastructure/material/material.module";
import {SharedService} from "../../shared/shared.service";
import {TokenService} from "../../shared/token.service";
import {By} from "@angular/platform-browser";
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {Reservation} from "./model/reservation.model";

describe('ReserveDialogComponent', () => {
  let component: ReserveDialogComponent;
  let fixture: ComponentFixture<ReserveDialogComponent>;
  let httpController:HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ReserveDialogComponent],
      imports:[ReactiveFormsModule,BrowserAnimationsModule,MaterialModule,HttpClientTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') }},
        { provide: MAT_DIALOG_DATA,
          useValue: {
            accommodationId: 1,
            minimumGuests: 1,
            maximumGuests: 5,
            availabilityPeriods: [
              {
                id: 1,
                price: 100,
                period: { startDate: 1706026004000, endDate: 1706544404000 },
                deleted: false,
              },
            ],
          }},
        { provide: SharedService, useValue: { openSnackBar: jasmine.createSpy('openSnackBar')}},
        { provide: TokenService, useValue: { getIdFromToken: jasmine.createSpy('getIdFromToken').and.returnValue(1)}},


      ],
    })
    .compileComponents();
    httpController=TestBed.inject(HttpTestingController)
    fixture = TestBed.createComponent(ReserveDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

  });

  afterEach(()=>{
    httpController.verify();
  })

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('number of guest form should be invalid', () => {
      //numberOfGuests should be from 1 to 5
      component.numberOfGuestsForm.controls['numberOfGuests'].setValue(7);
      console.log(component.getNumberOfGuestsErrorMessage())
      expect(component.numberOfGuestsForm.valid).toBeFalsy();
  });

  it('number of guest form should be valid', () => {
    //numberOfGuests should be from 1 to 5
    component.numberOfGuestsForm.controls['numberOfGuests'].setValue(3);
    expect(component.numberOfGuestsForm.valid).toBeTruthy();
  });

  it('period form should be invalid', () => {
    component.periodForm.controls['startDate'].setValue(null);
    component.periodForm.controls['endDate'].setValue(null);
    expect(component.numberOfGuestsForm.valid).toBeFalsy();
  });

  it('period form should be valid', () => {
    const startDate = new Date('2024-01-24');
    const endDate = new Date('2024-01-29');

    component.periodForm.controls['startDate'].setValue(startDate);
    component.periodForm.controls['endDate'].setValue(endDate);

    expect(component.periodForm.valid).toBeTruthy();
  });

  it('forms should be invalid after reseting input', () => {
    const numberOfGuestsInput=fixture.debugElement.query(By.css('input[name="numberOfGuests"]')).nativeElement;
    numberOfGuestsInput.value='3';
    numberOfGuestsInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const nextButton=fixture.debugElement.query(By.css('button.nextBtn')).nativeElement;
    nextButton.click();
    fixture.detectChanges();

    const startDateInput = fixture.nativeElement.querySelector('input[matStartDate]');
    const endDateInput = fixture.nativeElement.querySelector('input[matEndDate]');

    startDateInput.value = '01/25/2024';
    endDateInput.value = '01/27/2024';

    startDateInput.dispatchEvent(new Event('input'));
    endDateInput.dispatchEvent(new Event('input'));

    const periodNextButton=fixture.debugElement.query(By.css('button.periodNextBtn')).nativeElement;
    periodNextButton.click();
    fixture.detectChanges();

    const resetInputButton=fixture.debugElement.query(By.css('button.resetInputBtn')).nativeElement;
    resetInputButton.click();
    fixture.detectChanges();

    expect(component.periodForm.valid).toBeFalsy();
    expect(component.numberOfGuestsForm.valid).toBeFalsy();
  });

  it('should send a request', () => {
    const numberOfGuestsInput = fixture.debugElement.query(By.css('input[name="numberOfGuests"]')).nativeElement;
    numberOfGuestsInput.value = '3';
    numberOfGuestsInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const nextButton = fixture.debugElement.query(By.css('button.nextBtn')).nativeElement;
    nextButton.click();
    fixture.detectChanges();

    const startDateInput = fixture.nativeElement.querySelector('input[matStartDate]');
    const endDateInput = fixture.nativeElement.querySelector('input[matEndDate]');

    startDateInput.value = '01/25/2024';
    endDateInput.value = '01/27/2024';

    startDateInput.dispatchEvent(new Event('input'));
    endDateInput.dispatchEvent(new Event('input'));

    fixture.detectChanges();

    const reservation: Reservation = {
      numberOfGuests: component.numberOfGuestsForm.value.numberOfGuests ?? 0,
      accommodationId: component.data.accommodationId,
      reserveeId: 1,
      periodDTO: {
        startTimestamp: component.periodForm.value.startDate?.getTime() ?? 0,
        endTimestamp: component.periodForm.value.endDate?.getTime() ?? 0,
      },
    }
    component.reservationPost(reservation).subscribe({
      next:()=>console.log("Posted"),
      error: (error) => console.log("Error")
    })

    const req=httpController.expectOne({
      method:'POST',
      url:'http://localhost:8081/api/v1/reservations'
    })
    req.flush({})
  });

});
