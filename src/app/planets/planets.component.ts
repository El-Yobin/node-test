import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { P5JSInvoker } from '../common/p5JSInvoker';
import * as p5Methods from 'p5';
import { Planet } from './planet';
import { calculateAttractionForce } from '../common/calculations';

@Component({
  selector: 'app-physics',
  templateUrl: '../common/template/template.component.html',
  styleUrls: ['../common/template/template.component.scss']
})
export class PlanetsComponent extends P5JSInvoker implements AfterViewInit, OnDestroy {
  private p5: any;
  private balls: Planet[] = [];
  private bigBoi: Planet;

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
    this.generateBalls(p5);
    this.bigBoi = new Planet( p5.createVector(0, 0), 20, 50);
  }

  public draw(p5): void {
    this.updateScene();
    this.updateBalls();
    this.p5.fill(200);
    this.bigBoi.show();
  }

  private updateScene(): void {
    this.p5.background(150);
    this.p5.translate(this.p5.width / 2, this.p5.height / 2);
  }

  private generateBalls(p5): void {
    for (let i = 0; i < 200; i++) {
      const ball = new Planet(p5.createVector(p5.random(-500, 500), p5.random(-500, 500)), 1, 10);
      ball.applyForce(p5.createVector(p5.random(-1.5, 1.5), p5.random(-1.5, 1.5)));
      this.balls.push(ball);
    }
  }

  private updateBalls(): void {
    this.balls.forEach(ball => {
      if (p5Methods.Vector.dist(ball.position, this.bigBoi.position) < this.bigBoi.radius / 2) {
        this.balls = this.balls.filter(current => ball !== current);
      }
      this.p5.fill(255);
      ball.applyForce(calculateAttractionForce(this.bigBoi, ball));
      ball.update();
      ball.show();
    });
  }

  public ngOnDestroy(): void {
    this.p5.remove();
  }
}
