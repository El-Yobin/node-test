import { p5InstanceExtensions } from 'p5';
import { RigidBody } from '../common/rigidBody';

export class Particle extends RigidBody{
  public position;
  public radius;
  private opacity = 255;

  constructor(
   public p5: p5InstanceExtensions,
   private x,
   private y,
) {
    super(p5);
    this.position = this.p5.createVector(x, y);
    this.radius = this.p5.random(5, 30);
    this.applyForce(this.p5.createVector(this.p5.random(-10, 10), this.p5.random(-10, 10)));
  }

  public show(): void {
    this.p5.fill(255, this.opacity);
    this.p5.circle(this.position.x, this.position.y, this.radius);
    this.opacity -= this.p5.deltaTime / 2;
  }

  public isDead(): boolean {
   return this.opacity < 0;
  }
}
