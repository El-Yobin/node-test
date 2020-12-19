import * as p5Methods from 'p5';
import { p5InstanceExtensions } from 'p5';

export abstract class RigidBody {
  public mass = 1;
  public position: any;
  public acceleration: any;
  public velocity: any;

  protected constructor(
    protected p5: p5InstanceExtensions,
  ) {
    this.acceleration = this.p5.createVector(0, 0);
    this.velocity = this.p5.createVector(0, 0);
    this.position = this.p5.createVector(0, 0);
  }

  abstract show(): void;

  public update(): void {
    this.applyAcceleration();
    this.resetAcceleration();
  }

  public applyForce(force: p5Methods.Vector): void {
    this.acceleration.add(force.div(this.mass));
  }

  public applyGravity(gravityForce: number): void {
    this.acceleration.add(0, gravityForce);
  }

  public applyDrag(dragCoefficient: number): void {
    const speed = this.velocity.mag();
    const dragForce = this.velocity.copy().normalize();
    dragForce.mult(-dragCoefficient * speed * speed);
    this.applyForce(dragForce);
  }

  public moveToMouse(force: number): void {
    if (this.p5.mouseIsPressed) {
      const mousePosition = this.p5.createVector(this.p5.mouseX - this.p5.width / 2, this.p5.mouseY - this.p5.height / 2);
      const vectorToMouse = mousePosition.sub(this.position);
      this.applyForce(vectorToMouse.setMag(force));
    }
  }

  public applyFriction(frictionCoefficient: number): void {
    const friction = this.velocity.copy().normalize().mult(-frictionCoefficient);
    this.applyForce(friction);
  }

  private applyAcceleration(): void {
    this.position = this.position.add(this.velocity.add(this.acceleration));
  }

  private resetAcceleration(): void {
    this.acceleration.mult(0);
  }
}
