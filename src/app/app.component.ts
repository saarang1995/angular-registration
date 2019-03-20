import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-registration';
  private STORAGE_REGION_LIST = "RegionList";

  constructor(
    private apiService: ApiService
  ) { }
  ngOnInit(): void {
    if (!StorageService.get(this.STORAGE_REGION_LIST)) {
      this.apiService.fetchRegionList();
    }
  }
}
