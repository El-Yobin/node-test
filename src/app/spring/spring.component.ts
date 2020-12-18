import { AfterViewInit, Component } from '@angular/core';
import { P5JSInvoker } from '../p5JSInvoker';
import * as p5Methods from 'p5';
import { calculateSpringForce } from '../physics/spring';
import { Ball } from '../physics/ball';

@Component({
  selector: 'app-spring',
  templateUrl: './spring.component.html',
  styleUrls: ['../agario/agar.component.scss']
})
export class SpringComponent extends P5JSInvoker implements AfterViewInit {
  private p5: any;
  private bob: Ball;
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
    this.bob = new Ball(p5, this.p5, p5.createVector(0, 0), 2);
    this.origin = p5.createVector(0, -200);
  }

  public draw(p5): void {
    this.p5.background(200);
    this.p5.translate(this.p5.width / 2, this.p5.height / 2);
    this.updateBob();
  }

  private updateBob(): void {
    this.bob.applyGravity(0.01);
    this.bob.applyDrag(0.01);
    this.bob.applyForce(calculateSpringForce(this.bob, this.origin, 200, 0.01));
    this.bob.moveToMouse(2);
    this.bob.update();
    this.p5.line(this.origin.x, this.origin.y, this.bob.position.x, this.bob.position.y);
    this.bob.show();
  }
}
