import { p5InstanceExtensions } from 'p5';
import * as p5Methods from 'p5';

export class Agent {
  public position: any;
  public velocity: any;
  public acceleration: any;
  private readonly maxSpeed: number;
  private readonly maxSteeringForce: number;
  private size = 3;

  constructor(
    private p5: p5InstanceExtensions
  ) {
    this.position = p5.createVector(0, 0);
    this.velocity = p5.createVector(0, 0);
    this.acceleration = p5.createVector(0, 0);
    this.maxSpeed = 7;
    this.maxSteeringForce = 0.4;
  }

  public show(): void {
    const theta = this.velocity.heading() + this.p5.HALF_PI;
    this.p5.fill(127);
    this.p5.push();
    this.p5.translate(this.position.x, this.position.y);
    this.p5.rotate(theta);
    this.p5.beginShape();
    this.p5.vertex(0, -this.size * 2);
    this.p5.vertex(-this.size, this.size * 2);
    this.p5.vertex(this.size, this.size * 2);
    this.p5.endShape(this.p5.CLOSE);
    this.p5.pop();
  }

  public update(): void {
    this.updatePosition();
  }

  public seek(target): void {
    const desired = p5Methods.Vector.sub(target, this.position);
    const steeringForce = p5Methods.Vector.sub(desired, this.velocity);
    this.acceleration.add(steeringForce.limit(this.maxSteeringForce));
  }

  private updatePosition(): void {
    this.velocity.add(this.acceleration).limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
}
