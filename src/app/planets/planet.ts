import { RigidBody } from '../common/rigidBody';
import { p5InstanceExtensions } from 'p5';

export class Planet extends RigidBody {
  constructor(
     public p5: p5InstanceExtensions,
     public position: any,
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
