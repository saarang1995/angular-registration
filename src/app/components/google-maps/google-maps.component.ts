import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {
  marker: any;

  constructor(
    private databaseService: DatabaseService
  ) { }
  ngOnInit() {
    if (window["google"]) {
      this.initGoogleMap();
    }
    this.databaseService.googleMapsInitialized$.subscribe(() => {
      this.initGoogleMap();
    });
    this.databaseService.regionsListUpdated$.subscribe(() => {
      this.removeMarkersFromMap();
      this.addRegionsOnMap();
    });
  }

  private initGoogleMap() {
    window["map"] = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 1
    });
    this.addRegionsOnMap();
  }

  private addRegionsOnMap() {
    let regionList = this.databaseService.getRegionList();
    if (!regionList) {
      return;
    }
    regionList.forEach(region => {
      this.marker = new google.maps.Marker({
        position: region.location,
        map: window["map"],
        animation: google.maps.Animation.DROP,
        title: region.EnglishName
      });
      this.marker.setMap(window["map"]);
    });
  }

  private removeMarkersFromMap() {
    if (!this.marker) {
      return;
    }
    this.marker.setMap(null);
    this.marker = null;
  }
}
