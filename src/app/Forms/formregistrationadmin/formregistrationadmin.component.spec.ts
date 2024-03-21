import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormregistrationadminComponent } from './formregistrationadmin.component';

describe('FormregistrationadminComponent', () => {
  let component: FormregistrationadminComponent;
  let fixture: ComponentFixture<FormregistrationadminComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormregistrationadminComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormregistrationadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
