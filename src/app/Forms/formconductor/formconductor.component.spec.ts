import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormconductorComponent } from './formconductor.component';

describe('FormconductorComponent', () => {
  let component: FormconductorComponent;
  let fixture: ComponentFixture<FormconductorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormconductorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormconductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
