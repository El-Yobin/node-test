import { p5InstanceExtensions } from 'p5';
import * as p5Methods from 'p5';

export class Ball {
  constructor(
    private p5: p5InstanceExtensions,
    private canvas: any,
  ) { }

  public position = this.p5.createVector(0, 0);
  public radius = 50;
  private velocity = this.p5.createVector(4, 4);
  private center = this.p5.createVector(this.canvas.width / 2, this.canvas.height / 2);

  public show(): void {
    this.p5.circle(this.position.x, this.position.y, this.radius);
  }

  public update(): void {
    this.position = this.position.add(this.velocity);
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
