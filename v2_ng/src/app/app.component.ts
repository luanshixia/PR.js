import { Component, AfterViewInit } from '@angular/core';
import { Rating } from '../comp-js';
import { Node, MindMap } from '../emind';

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

    const root = new Node('Root',
      new Node('Children 1',
        new Node('Children 4'),
        new Node('Children 5')),
      new Node('Children 2'),
      new Node('Children 3'));

    root.updateAllRecursively();

    root.walk((node: Node) => console.log(node.toDebugString()));

    const map = new MindMap();
    map.root = root;

    console.log(map.toSvgString());

  }
}
