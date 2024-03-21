import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GetCodigoComponent } from './get-codigo.component';

describe('GetCodigoComponent', () => {
  let component: GetCodigoComponent;
  let fixture: ComponentFixture<GetCodigoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GetCodigoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GetCodigoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
