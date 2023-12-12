import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestScreenComponent } from './request-screen.component';

describe('RequestScreenComponent', () => {
  let component: RequestScreenComponent;
  let fixture: ComponentFixture<RequestScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RequestScreenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RequestScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
