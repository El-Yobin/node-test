import { AfterViewInit, Component } from '@angular/core';
import { P5JSInvoker } from '../p5JSInvoker';
import { Ball } from "./prefabs/ball";

@Component({
  selector: 'app-physics',
  templateUrl: './physics.component.html',
  styleUrls: ['../agario/agar.component.scss']
})
export class PhysicsComponent extends P5JSInvoker implements AfterViewInit {
  private p5: any;
  private ball: Ball;

  constructor() {
    super();
  }

  public ngAfterViewInit(): void {
    this.startP5JS(document.getElementById('container'));
  }

  public preload(p5): void {
  }

  public setup(p5): void {
    this.p5 = p5.createCanvas(1024, 500);
    this.p5.translate(this.p5.width / 2, this.p5.height / 2);
    this.ball = new Ball(p5, this.p5);
  }

  public draw(p5): void {
    this.updateScene();
    this.ball.update();
    this.ball.show();
  }

  private updateScene(): void {
    this.p5.background(200);
    this.p5.translate(this.p5.width / 2, this.p5.height / 2);
  }

}
