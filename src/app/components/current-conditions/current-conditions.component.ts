import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.scss']
})
export class CurrentConditionsComponent implements OnInit {

  topCities: any = [];
  topCitiesToShow: any = [];

  constructor(
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    this.topCities = this.databaseService.getTopCities();
    this.topCitiesToShow = this.topCities;
    this.databaseService.topCitiesChangeEvent$.subscribe(() => {
      this.topCities = this.databaseService.getTopCities();
      this.topCitiesToShow = this.topCities;
    });
  }

  filterCities(placeInputText: string) {
    this.topCitiesToShow =  this.topCities.filter((city)=>{
      return city.EnglishName.toLowerCase().includes(placeInputText.toLowerCase())});
  }

}
