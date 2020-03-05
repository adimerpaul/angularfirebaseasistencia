import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControlsdayComponent } from './controlsday.component';

describe('ControlsdayComponent', () => {
  let component: ControlsdayComponent;
  let fixture: ComponentFixture<ControlsdayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControlsdayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControlsdayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
