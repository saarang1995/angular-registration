import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { RegionIntf } from 'src/app/interfaces/region-Intf';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.scss']
})
export class RegionListComponent implements OnInit {
  private STORAGE_REGION_LIST = "RegionList";
  regionList: RegionIntf[];

  constructor(
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    this.regionList = this.databaseService.getRegionList();
  }

}
