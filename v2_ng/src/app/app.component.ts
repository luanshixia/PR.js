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

    const root = Node.fromSpecString('{"content":"Root","children":[{"content":"Children 1","children":[{"content":"Children 4"},{"content":"Children 5"}]},{"content":"Children 2"},{"content":"Children 3"}]}');

    root.updateAllRecursively();

    root.walk((node: Node) => console.log(node.toDebugString()));

    const map = new MindMap(root);

    console.log(map.toSvgString());
    console.log(map.toSpecString());

  }
}
