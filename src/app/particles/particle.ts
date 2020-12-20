import { p5InstanceExtensions } from 'p5';
import { RigidBody } from '../common/rigidBody';

export class Particle extends RigidBody{
  public position;

  constructor(
   public p5: p5InstanceExtensions,
   private x,
   private y,
) {
    super(p5);
    this.position = this.p5.createVector(x, y);
    this.applyForce(this.p5.createVector(this.p5.random(-5, 5), this.p5.random(-5, 5)));
  }

  public show(): void {
    this.p5.circle(this.position.x, this.position.y, 20);
  }

  public isDead(): boolean {
    return false;
  }
}
