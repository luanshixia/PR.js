import { Component, OnInit, AfterViewInit, Input } from '@angular/core';
import { InputConverter } from '../../utils/InputConverter';
import Examples from '../../pr-js/examples/index';

@Component({
  selector: 'pr-app',
  templateUrl: './pr-app.component.html',
  styleUrls: ['./pr-app.component.css'],
  providers: [Examples]
})
export class PrAppComponent implements OnInit, AfterViewInit {

  @Input() caption: string;
  @Input() description: string;
  @Input() @InputConverter() canvasWidth: number = 300;
  @Input() @InputConverter() canvasHeight: number = 300;
  @Input() example: string;
  @Input() @InputConverter() loop: boolean = true;
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
