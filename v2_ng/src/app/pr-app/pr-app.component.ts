import { Component, OnInit, Input } from '@angular/core';
import Examples from '../../pr-js/examples/index';

@Component({
  selector: 'pr-app',
  templateUrl: './pr-app.component.html',
  styleUrls: ['./pr-app.component.css'],
  providers: [Examples]
})
export class PrAppComponent implements OnInit {

  @Input() title: string;
  @Input() description: string;
  @Input() canvasWidth: number;
  @Input() canvasHeight: number;
  @Input() example: string;
  @Input() loop: boolean;
  canvasId: string;

  constructor(private examples: Examples) {}

  ngOnInit() {
    const app = this.examples[this.example];
    this.canvasId = `canvas-${app.id}`;
  }

  ngAfterViewInit() {
    const app = this.examples[this.example];
    app.launch(`#${this.canvasId}`, this.loop);
  }

}
