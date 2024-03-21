import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormListCheckComponent } from './form-list-check.component';

describe('FormListCheckComponent', () => {
  let component: FormListCheckComponent;
  let fixture: ComponentFixture<FormListCheckComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormListCheckComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormListCheckComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
