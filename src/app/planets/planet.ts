import { RigidBody } from '../common/rigidBody';
import { p5InstanceExtensions } from 'p5';

export class Planet extends RigidBody {
  constructor(
     public position: any,
     public mass = 1,
     public radius: number,
  ) {
    super();
  }

  public show(): void {
    this.p5.circle(this.position.x, this.position.y, this.radius);
  }
}
