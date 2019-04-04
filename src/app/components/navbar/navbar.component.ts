import { Component, OnInit, Input } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isUserLoggedIn: boolean;
  @Input() title: string;
  constructor(
    private databaseService: DatabaseService,
    private apiService: ApiService
  ) { }

  ngOnInit() {
    this.databaseService.userDetailsChangeEvent$.subscribe(() => {
      this.isUserLoggedIn = this.databaseService.isUserLoggedIn();
    });
    this.isUserLoggedIn = this.databaseService.isUserLoggedIn();
  }

  logoutUser() {
    this.apiService.logoutUser(true);
  }
}
