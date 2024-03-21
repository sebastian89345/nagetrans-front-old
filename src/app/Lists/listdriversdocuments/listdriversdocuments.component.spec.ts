import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListdriversdocumentsComponent } from './listdriversdocuments.component';

describe('ListdriversdocumentsComponent', () => {
  let component: ListdriversdocumentsComponent;
  let fixture: ComponentFixture<ListdriversdocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListdriversdocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListdriversdocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
