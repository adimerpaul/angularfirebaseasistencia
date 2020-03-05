import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminsisComponent } from './adminsis.component';

describe('AdminsisComponent', () => {
  let component: AdminsisComponent;
  let fixture: ComponentFixture<AdminsisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminsisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminsisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
