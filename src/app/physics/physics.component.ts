import { AfterViewInit, Component } from '@angular/core';
import { P5JSInvoker } from '../p5JSInvoker';
import { Ball } from './prefabs/ball';
import * as p5Methods from 'p5';

@Component({
  selector: 'app-physics',
  templateUrl: './physics.component.html',
  styleUrls: ['../agario/agar.component.scss']
})
export class PhysicsComponent extends P5JSInvoker implements AfterViewInit {
  private p5: any;
  private balls: Ball[] = [];
  private bigBoi: Ball;
  private smolBoi: Ball;

  constructor() {
    super();
  }

  public ngAfterViewInit(): void {
    this.startP5JS(document.getElementById('container'));
  }

  public preload(p5): void {
  }

  public setup(p5): void {
    this.p5 = p5.createCanvas(1400, 700);
    this.bigBoi = new Ball(p5, this.p5, 13, p5.createVector(0, 0));
    this.smolBoi = new Ball(p5, this.p5, 4, p5.createVector(200, 200));
    this.smolBoi.applyForce(p5.createVector(2, -2));
    this.balls.push(this.smolBoi);
    this.smolBoi = new Ball(p5, this.p5, 4, p5.createVector(0, 350));
    this.smolBoi.applyForce(p5.createVector(-3, 0));
    this.balls.push(this.smolBoi);
    this.generateBalls(p5);
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
    for (let i = 0; i < 100; i++) {
      const ball = new Ball(p5, this.p5, 1, p5.createVector(p5.random(-500, 500), p5.random(-500, 500)));
      ball.applyForce(p5.createVector(p5.random(-1, 1), p5.random(-1, 1)));
      this.balls.push(ball);
    }
  }

  private updateBalls(): void {
    this.balls.forEach(ball => {
      this.p5.fill(255);
      if (p5Methods.Vector.dist(ball.position, this.bigBoi.position) < this.bigBoi.radius / 2) {
       this.balls = this.balls.filter(current => ball !== current);
      }
      ball.applyForce(this.bigBoi.calculateAttractionForce(ball));
      ball.update();
      ball.show();
    });
  }
}
