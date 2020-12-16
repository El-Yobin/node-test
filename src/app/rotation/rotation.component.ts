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
  private radius = 250;
  private angle = 25;
  private movingIn = true;
  private angularVelocity = 0.1;
  private previousPos: p5Methods.Vector = new p5Methods.Vector();

  constructor() {
    super();
  }

  public ngAfterViewInit(): void {
    this.startP5JS(document.getElementById('container'));
    this.previousPos.set(this.radius * Math.cos(this.angle), this.radius * Math.sin(this.angle));

  }

  public preload(p5): void {
  }

  public setup(p5): void {
    this.p5 = p5.createCanvas(1000, 600);
    this.p5.background(0);
  }

  public draw(p5): void {
    this.p5.translate(this.p5.width / 2, this.p5.height / 2);
    this.updateBall(p5);
  }

  private updateBall(p5): void {
    this.angle += this.angularVelocity;
    if (this.movingIn) {
      this.radius -= 13;
      if (this.radius < 1) {
        this.movingIn = false;
      }
    } else {
      this.radius += 42;
      if (this.radius > 255) {
        this.movingIn = true;
      }
    }
    const x = this.radius * p5.cos(this.angle);
    const y = this.radius * p5.sin(this.angle);
    p5.stroke(255);
    p5.line(this.previousPos.x, this.previousPos.y, x, y);
    this.previousPos.set(x, y);
  }
}
