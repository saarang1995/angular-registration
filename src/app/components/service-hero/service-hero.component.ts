import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-service-hero',
  templateUrl: './service-hero.component.html',
  styleUrls: ['./service-hero.component.scss']
})
export class ServiceHeroComponent implements OnInit {
  @Input() backgroundImage: string;
  @Input() backgroundMessage: string;
  constructor() { }

  ngOnInit() {
  }

}
