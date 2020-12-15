import * as p5Methods from 'p5';
import { p5InstanceExtensions } from 'p5';

export class Ball {
  constructor(
    private p5: p5InstanceExtensions,
    private canvas: any,
  ) { }

  public position = this.p5.createVector(this.p5.random(-200, 200), this.p5.random(-200, 200));
  public mass = this.p5.random(0.5, 4);
  public radius = this.mass * 10;
  private acceleration = this.p5.createVector(0, 0);
  private velocity = this.p5.createVector(0, 0);
  private center = this.p5.createVector(this.canvas.width / 2, this.canvas.height / 2);

  public show(): void {
    this.p5.circle(this.position.x, this.position.y, this.radius);
  }

  public update(): void {
    this.bounceFromEdges();
    this.moveToMouse();
    // this.applyGravity();
    // this.applyFriction(0.005);
    // this.applyDrag(0.003);

    this.applyAcceleration();
    this.resetAcceleration();
  }


  public applyForce(force: p5Methods.Vector): void {
    this.acceleration.add(force.div(this.mass));
  }

  private bounceFromEdges(): void {
    if ((this.position.x >= this.center.x - this.radius / 2) || (this.position.x <= -this.center.x + this.radius / 2)) {
      this.velocity.x *= -0.7;
    }
    if ((this.position.y >= this.center.y - this.radius / 2) || (this.position.y <= -this.center.y + this.radius / 2)) {
      this.velocity.y *= -0.7;
    }
  }

  private moveToMouse(): void {
    if (this.p5.mouseIsPressed) {
      const mousePosition = this.p5.createVector(this.p5.mouseX - this.center.x, this.p5.mouseY - this.center.y);
      const vectorToMouse = mousePosition.sub(this.position);
      this.applyForce(vectorToMouse.setMag(0.5));
    }
  }

  private applyGravity(): void {
    if (this.position.y + this.radius / 2 < this.canvas.height / 2) {
      this.acceleration.add(0, 0.1);
    }
  }

  private applyFriction(frictionCoefficient: number): void {
    const friction = this.velocity.copy().normalize().mult(-frictionCoefficient);
    this.applyForce(friction);
  }

  private applyDrag(dragCoefficient: number): void {
    const speed = this.velocity.mag();
    const dragForce = this.velocity.copy().normalize();
    dragForce.mult(-dragCoefficient * speed * speed);
    this.applyForce(dragForce);
  }

  private applyAcceleration(): void {
    this.position = this.position.add(this.velocity.add(this.acceleration));
  }

  private resetAcceleration(): void {
    this.acceleration.mult(0);
  }
}
