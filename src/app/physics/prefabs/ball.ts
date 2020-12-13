import * as p5Methods from 'p5';
import { p5InstanceExtensions } from 'p5';

export class Ball {
  constructor(
    private p5: p5InstanceExtensions,
    private canvas: any,
  ) { }

  public position = this.p5.createVector(this.p5.random(-200, 200), this.p5.random(-200, 200));
  public radius = 50;
  private acceleration = this.p5.createVector(0, 0);
  private velocity = this.p5.createVector(0, 0);
  private center = this.p5.createVector(this.canvas.width / 2, this.canvas.height / 2);
  private relativeMousePos = this.p5.createVector(0, 0);

  public show(): void {
    this.p5.circle(this.position.x, this.position.y, this.radius);
  }

  public update(): void {
    if (this.p5.mouseIsPressed) {
      this.relativeMousePos = p5Methods.Vector.sub(this.p5.createVector(
        this.p5.mouseX - this.center.x, this.p5.mouseY - this.center.y
      ), this.position);
      this.acceleration = this.relativeMousePos.normalize();
    } else {
      this.acceleration.mult(0);
    }
    this.position = this.position.add(this.velocity.add(this.acceleration).add(0, 0.1));
    this.edges();
  }

  private edges(): void {
    if ((this.position.x >= this.center.x - 25) || (this.position.x <= -this.center.x + this.radius / 2)) {
      this.velocity.x *= -1;
    }
    if ((this.position.y >= this.center.y - 25) || (this.position.y <= -this.center.y + this.radius / 2)) {
      this.velocity.y *= -1;
    }
  }
}
