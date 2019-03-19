import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SatelliteImageryComponent } from './satellite-imagery.component';

describe('SatelliteImageryComponent', () => {
  let component: SatelliteImageryComponent;
  let fixture: ComponentFixture<SatelliteImageryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SatelliteImageryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SatelliteImageryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
