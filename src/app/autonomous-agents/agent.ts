import { p5InstanceExtensions } from 'p5';
import * as p5Methods from 'p5';

export class Agent {
  public position: any;
  public velocity: any;
  public acceleration: any;
  private readonly maxSpeed: number;
  private readonly maxSteeringForce: number;
  private readonly size = 3;

  constructor(
    private p5: p5InstanceExtensions
  ) {
    this.position = p5.createVector(0, 0);
    this.velocity = p5.createVector(0, 0);
    this.acceleration = p5.createVector(p5.random(-5, 5), p5.random(-5, 5));
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
    this.velocity.add(this.acceleration).limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  public seek(target): void {
    const desired = this.getDesiredVector(target, 100);
    const steeringForce = p5Methods.Vector.sub(desired, this.velocity);
    this.acceleration.add(steeringForce.limit(this.maxSteeringForce));
  }


  public avoid(chaser): void {
    const distanceToChaser = p5Methods.Vector.dist(chaser.position, this.position);
    if (distanceToChaser < 30) {
      const oppositeDesired = this.getDesiredVector(chaser.position, 50).mult(-1);
      this.acceleration.add(oppositeDesired.limit(this.maxSteeringForce));
    }
  }

  private getDesiredVector(target, finalDistance: number): any {
    const desired = p5Methods.Vector.sub(target, this.position);
    const distance = p5Methods.Vector.dist(this.position, target);
    if (distance < finalDistance) {
      desired.setMag(this.p5.map(distance, 0, 100, 0, this.maxSpeed));
    }
    return desired;
  }

}
