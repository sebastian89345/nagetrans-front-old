import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormdriversdocumentsComponent } from './formdriversdocuments.component';

describe('FormdriversdocumentsComponent', () => {
  let component: FormdriversdocumentsComponent;
  let fixture: ComponentFixture<FormdriversdocumentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FormdriversdocumentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FormdriversdocumentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
