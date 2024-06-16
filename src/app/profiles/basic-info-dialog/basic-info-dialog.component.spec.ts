import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasicInfoDialogComponent } from './basic-info-dialog.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {MatDialogRef} from "@angular/material/dialog";

fdescribe('BasicInfoDialogComponent', (): void => {
  let component: BasicInfoDialogComponent;
  let fixture: ComponentFixture<BasicInfoDialogComponent>;
  let httpController: HttpTestingController;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [BasicInfoDialogComponent],
      imports: [HttpClientTestingModule],
      providers: [
        { provide: MatDialogRef, useValue: { close: jasmine.createSpy('close') } },
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
});
