import { RigidBody } from './rigidBody';
import { p5InstanceExtensions } from 'p5';
import * as p5Methods from 'p5';

export class Ball extends RigidBody {
  public radius = 20;
  constructor(
     p5: p5InstanceExtensions,
     canvas: any,
     position: p5Methods.Vector,
     mass = 1,
  ) {
    super(
      p5,
      canvas,
      position,
      mass,
    );
  }

  public show(): void {
    this.p5.circle(this.position.x, this.position.y, this.radius);
  }
}
