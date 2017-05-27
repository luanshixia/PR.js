import { Component, OnInit } from '@angular/core';
import App from '../../pr-js/examples/basic_nonloop/app';

@Component({
  selector: 'pr-app',
  templateUrl: './pr-app.component.html',
  styleUrls: ['./pr-app.component.css'],
  providers: [App]
})
export class PrAppComponent implements OnInit {

  constructor(private app: App) { }

  ngOnInit() {
    this.app.launch('#pr-canvas', false);
  }

}
