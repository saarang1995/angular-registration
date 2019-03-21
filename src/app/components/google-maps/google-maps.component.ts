import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss']
})
export class GoogleMapsComponent implements OnInit {
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
  }

  private initGoogleMap() {
    window["map"] = new google.maps.Map(document.getElementById('map'), {
      center: { lat: -34.397, lng: 150.644 },
      zoom: 8
    });
  }
}
