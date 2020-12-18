import * as p5Methods from 'p5';
import { p5InstanceExtensions } from 'p5';

export abstract class RigidBody {
  protected constructor(
    public p5: p5InstanceExtensions,
    public canvas: any,
    public position: p5Methods.Vector,
    public mass: number,
  ) {
  }

  public acceleration = this.p5.createVector(0, 0);
  public velocity = this.p5.createVector(0, 0);
  public center = this.p5.createVector(this.canvas.width / 2, this.canvas.height / 2);

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
