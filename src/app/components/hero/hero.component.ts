import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.scss']
})
export class HeroComponent implements OnInit {

  isUserLoggerIn: boolean = false;

  constructor(
    private databaseService: DatabaseService
  ) { }

  ngOnInit() {
    this.isUserLoggerIn = this.databaseService.isUserLoggedIn();
  }

}
