import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormVehicleDocumentsComponent } from './form-vehicle-documents.component';

describe('FormVehicleDocumentsComponent', () => {
  let component: FormVehicleDocumentsComponent;
  let fixture: ComponentFixture<FormVehicleDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormVehicleDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormVehicleDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
