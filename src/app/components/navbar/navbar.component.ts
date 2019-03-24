import { Component, OnInit } from '@angular/core';
import { DatabaseService } from 'src/app/services/database.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  isUserLoggedIn: boolean;
  constructor(
    private database: DatabaseService
  ) { }

  ngOnInit() {
    this.database.userDetailsChangeEvent$.subscribe(()=>{
      this.isUserLoggedIn = this.database.isUserLoggedIn();
    });
    this.isUserLoggedIn = this.database.isUserLoggedIn();
  }


}
