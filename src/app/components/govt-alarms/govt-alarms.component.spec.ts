import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GovtAlarmsComponent } from './govt-alarms.component';

describe('GovtAlarmsComponent', () => {
  let component: GovtAlarmsComponent;
  let fixture: ComponentFixture<GovtAlarmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GovtAlarmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GovtAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
