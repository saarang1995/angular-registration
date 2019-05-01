import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-current-conditions',
  templateUrl: './current-conditions.component.html',
  styleUrls: ['./current-conditions.component.scss']
})
export class CurrentConditionsComponent implements OnInit {

  topCities: any = [];
  topCitiesToShow: any = [];
  selectedCityData: CityDataIntf;
  showDropDown: boolean = false;
  showReport: boolean = false;
  generatingReport: boolean = false;
  defaultReportText: boolean = true;
  constructor(
    private databaseService: DatabaseService,
    private apiService: ApiService
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
    this.topCitiesToShow = this.topCities.filter((city) => {
      return city.EnglishName.toLowerCase().includes(placeInputText.toLowerCase())
    });
  }

  showWeatherReport(city: any) {
    this.showReport = false;
    this.generatingReport = true;
    this.defaultReportText = false;
    this.apiService.fetchCurrencyConditions(city.Key).subscribe((data: { success: boolean, message: any }) => {
      if (data.success) {
        const response = data.message;
        this.showReport = true;
        this.generatingReport = false;
        this.selectedCityData = {
          name: city.EnglishName,
          countryName: city.Country.EnglishName,
          WeatherText: response[0].WeatherText,
          HasPrecipitation: response[0].HasPrecipitation,
          Temperature: response[0].Temperature.Metric.Value + ' ' + response[0].Temperature.Metric.Unit
        }
      }
    });
  }

  toggleDropDown(){
    this.showDropDown = !this.showDropDown;
  }
}


interface CityDataIntf {
  name: string,
  countryName: string,
  WeatherText: string,
  HasPrecipitation: string,
  Temperature: string
}