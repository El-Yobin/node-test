import { p5InstanceExtensions } from 'p5';
import { P5InstanceService } from './p5-instance.service';

export abstract class RigidBody {
  public mass = 1;
  public position: any;
  public acceleration: any;
  public velocity: any;
  protected p5: p5InstanceExtensions = P5InstanceService.p5Instance;

  protected constructor() {
    this.acceleration = this.p5.createVector(0, 0);
    this.velocity = this.p5.createVector(0, 0);
    this.position = this.p5.createVector(0, 0);
  }

  public update(): void {
    this.applyAcceleration();
    this.resetAcceleration();
  }

  public applyForce(force: any): void {
    this.acceleration.add(force.div(this.mass));
  }

  public applyGravity(gravityForce: number): void {
    this.acceleration.add(0, gravityForce);
  }

  public applyAirResistance(dragCoefficient: number): void {
    const speed = this.velocity.mag();
    const dragForce = this.velocity.copy().normalize();
    dragForce.mult(-dragCoefficient * speed * speed);
    this.applyForce(dragForce);
  }

  public moveToMouse(efficiency: number): void {
    if (this.p5.mouseIsPressed) {
      const mousePosition = this.p5.createVector(this.p5.mouseX - this.p5.width / 2, this.p5.mouseY - this.p5.height / 2);
      const vectorToMouse = mousePosition.sub(this.position);
      this.applyForce(vectorToMouse.setMag(efficiency));
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

// export class RigidBody extends BaseRigidBody {
//   constructor(@Inject(P5_SERVICE_TOKEN) private p5InstanceService?: P5InstanceService){
//     super(p5InstanceService.p5Instance);
//   }
// }
