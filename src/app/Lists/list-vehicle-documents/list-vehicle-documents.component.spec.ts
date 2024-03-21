import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVehicleDocumentsComponent } from './list-vehicle-documents.component';

describe('ListVehicleDocumentsComponent', () => {
  let component: ListVehicleDocumentsComponent;
  let fixture: ComponentFixture<ListVehicleDocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListVehicleDocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListVehicleDocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
