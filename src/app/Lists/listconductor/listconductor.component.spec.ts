import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListconductorComponent } from './listconductor.component';

describe('ListconductorComponent', () => {
  let component: ListconductorComponent;
  let fixture: ComponentFixture<ListconductorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListconductorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListconductorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
