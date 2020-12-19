import { RigidBody } from './rigidBody';
import { p5InstanceExtensions } from 'p5';
import * as p5Methods from 'p5';

export class Ball extends RigidBody {
  constructor(
     public p5: p5InstanceExtensions,
     public position: p5Methods.Vector,
     public mass = 1,
     public radius: number,
  ) {
    super(
      p5,
    );
  }

  public show(): void {
    this.p5.circle(this.position.x, this.position.y, this.radius);
  }
}
