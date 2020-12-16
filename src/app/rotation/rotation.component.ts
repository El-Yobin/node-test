import { AfterViewInit, Component } from '@angular/core';
import { P5JSInvoker } from '../p5JSInvoker';
import * as p5Methods from 'p5';

@Component({
  selector: 'app-rotation',
  templateUrl: './rotation.component.html',
  styleUrls: ['../agario/agar.component.scss']
})
export class RotationComponent extends P5JSInvoker implements AfterViewInit {
  public p5: any;

  constructor() {
    super();
  }

  public ngAfterViewInit(): void {
    this.startP5JS(document.getElementById('container'));
  }

  public preload(p5): void {
  }

  public setup(p5): void {
    this.p5 = p5.createCanvas(1000, 600);
    p5.rectMode(p5.CENTER);
  }

  public draw(p5): void {
    this.p5.background(255);
    this.p5.translate(this.p5.width / 2, this.p5.height / 2);
    p5.fill(100);
    p5.rotate(p5.QUARTER_PI);
    p5.rect(0, 0, 200, 40);
  }

}
