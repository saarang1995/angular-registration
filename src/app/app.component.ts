import { Component } from '@angular/core';
import { ApiService } from './services/api.service';
import { StorageService } from './services/storage.service';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'angular-registration';
  private STORAGE_REGION_LIST = "RegionList";

  constructor(
    private apiService: ApiService,
    private databaseService: DatabaseService
  ) { }
  
  ngOnInit(): void {
    window["initMap"] = () => {
      this.databaseService.googleMapsInitialized.next();
      if (!StorageService.get(this.STORAGE_REGION_LIST)) {
        this.apiService.fetchRegionList();
      }
    }
  }
}
