import { Component, OnInit } from '@angular/core';
import { RegionIntf } from 'src/app/interfaces/region-Intf';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-forecasts',
  templateUrl: './forecasts.component.html',
  styleUrls: ['./forecasts.component.scss']
})
export class ForecastsComponent implements OnInit {

  existingForecastPreferences: boolean = false;
  showForecastPopup: boolean = false;
  regionList: RegionIntf[];
  constructor(
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    this.regionList = this.databaseService.getRegionList();
  }

  showAddForecastPopup(status: boolean) {
    this.showForecastPopup = status;
  }
}
