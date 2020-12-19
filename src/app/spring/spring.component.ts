import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { P5JSInvoker } from '../p5JSInvoker';
import * as p5Methods from 'p5';
import { calculateSpringForce } from '../common/calculations';
import { Planet } from '../planets/planet';

@Component({
  selector: 'app-spring',
  templateUrl: '../common/template.component.html',
  styleUrls: ['../common/template.component.scss']
})
export class SpringComponent extends P5JSInvoker implements AfterViewInit, OnDestroy {
  private p5: any;
  private bob: Planet;
  private origin: p5Methods.Vector;

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
    this.p5.background(0);
    this.bob = new Planet(p5, p5.createVector(0, 0), 1, 20);
    this.origin = p5.createVector(0, -200);
  }

  public draw(p5): void {
    this.p5.background(200);
    this.p5.translate(this.p5.width / 2, this.p5.height / 2);
    this.updateBob();
  }

  private updateBob(): void {
    this.bob.applyGravity(1);
    this.bob.applyDrag(0.005);
    this.bob.applyForce(calculateSpringForce(this.bob, this.origin, 200, 0.01));
    this.bob.moveToMouse(2);
    this.bob.update();
    this.p5.line(this.origin.x, this.origin.y, this.bob.position.x, this.bob.position.y);
    this.bob.show();
  }

   public ngOnDestroy(): void {
      this.p5.remove();
   }
}
