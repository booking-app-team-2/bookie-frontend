import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TelephoneDialogComponent } from './telephone-dialog.component';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";

fdescribe('TelephoneDialogComponent', (): void => {
  let component: TelephoneDialogComponent;
  let fixture: ComponentFixture<TelephoneDialogComponent>;
  let httpController: HttpTestingController;

  beforeEach(async (): Promise<void> => {
    await TestBed.configureTestingModule({
      declarations: [TelephoneDialogComponent],
      imports: [HttpClientTestingModule],
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
});
