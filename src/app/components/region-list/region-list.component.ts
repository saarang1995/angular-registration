import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-region-list',
  templateUrl: './region-list.component.html',
  styleUrls: ['./region-list.component.scss']
})
export class RegionListComponent implements OnInit {
  private STORAGE_REGION_LIST = "RegionList";
  constructor(
    private apiService: ApiService
  ) {
    if (!StorageService.get(this.STORAGE_REGION_LIST)) {
      this.apiService.fetchRegionList();
    }
    else {
      console.log(StorageService.get(this.STORAGE_REGION_LIST))
    }
  }

  ngOnInit() {
  }

}
