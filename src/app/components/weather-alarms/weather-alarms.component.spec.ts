import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeatherAlarmsComponent } from './weather-alarms.component';

describe('WeatherAlarmsComponent', () => {
  let component: WeatherAlarmsComponent;
  let fixture: ComponentFixture<WeatherAlarmsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WeatherAlarmsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherAlarmsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
