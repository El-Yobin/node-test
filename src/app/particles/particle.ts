import { p5InstanceExtensions } from 'p5';
import { RigidBody } from '../common/rigidBody';

export class Particle extends RigidBody{
  public position;
  private startForce;

  constructor(
   public p5: p5InstanceExtensions,
   private x,
   private y,
) {
    super(p5);
    this.position = this.p5.createVector(x, y);
  }

  public show(): void {
    this.p5.circle(this.position.x, this.position.y, 20);
  }

  public isDead(): boolean {
    return false;
  }
}
