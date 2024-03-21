import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormvehicleComponent } from './formvehicle.component';

describe('FormvehicleComponent', () => {
  let component: FormvehicleComponent;
  let fixture: ComponentFixture<FormvehicleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormvehicleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormvehicleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
