import { Component, AfterViewInit } from '@angular/core';
import { Rating } from '../comp-js';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements AfterViewInit {
  title = 'PR = Processing Reduced';

  ngAfterViewInit() {
    const comp = new Rating({ name: 'test', rating: 3 });
    comp.renderTo('#comp-test');
  }
}
