import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.scss']
})
export class CurrentConditionsComponent implements OnInit {

  topCities: any = [];

  constructor(
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    this.topCities = this.databaseService.getTopCities();
    this.databaseService.topCitiesChangeEvent$.subscribe(() => {
      this.topCities = this.databaseService.getTopCities();
    });
  }

}
