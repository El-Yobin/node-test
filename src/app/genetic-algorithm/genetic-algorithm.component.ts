import { AfterViewInit, Component } from '@angular/core';
import { P5JSInvoker } from '../common/p5JSInvoker';
import { p5InstanceExtensions } from 'p5';
import { P5InstanceService } from '../common/p5-instance.service';

@Component({
  selector: 'app-genetic-algorithm',
  templateUrl: '../common/template/template.component.html',
  styleUrls: ['../common/template/template.component.scss'],
})
export class GeneticAlgorithmComponent
  extends P5JSInvoker
  implements AfterViewInit {
  private p5: p5InstanceExtensions;
  constructor() {
    super();
  }

  public ngAfterViewInit(): void {
    this.startP5JS(document.getElementById('container'));
  }

  public preload(p): void {
    this.p5 = P5InstanceService.p5Instance = p;
  }

  public setup(p): void {}

  public draw(p): void {}
}
