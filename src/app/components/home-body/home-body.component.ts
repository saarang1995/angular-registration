import { Component, OnInit } from '@angular/core';
import { HelperService } from 'src/app/services/helper.service';

@Component({
  selector: 'app-home-body',
  templateUrl: './home-body.component.html',
  styleUrls: ['./home-body.component.scss']
})
export class HomeBodyComponent implements OnInit {

  constructor(
    private helperService: HelperService
  ) { }

  ngOnInit() {
  }
  setRedirectUrl(url: string) {
    this.helperService.setRedirectUrl(url);
  }
}
