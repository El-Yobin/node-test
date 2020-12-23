import { RigidBody } from '../common/rigidBody';

export class Particle extends RigidBody{
  public position;
  public diameter;
  private opacity = 255;
  readonly rotation: number;

  constructor(
   public img: any,
   private x,
   private y,
) {
    super();
    this.position = this.p5.createVector(x, y);
    this.diameter = 50;
    this.rotation = this.p5.random(this.p5.PI * 2);

    this.applyForce(this.p5.createVector(this.p5.mouseX -  this.p5.width / 2, this.p5.mouseY - this.p5.height / 2).div(30));
  }

  public show(): void {
    this.applyGravity(-0.7);
    this.p5.imageMode(this.p5.CENTER);
    this.p5.tint(255, this.opacity);

    this.rotate();
    this.opacity -= this.p5.deltaTime / 4;
    this.diameter += this.p5.deltaTime / 4;
  }

  private rotate(): void {
    this.p5.push();
    this.p5.translate(this.position.x, this.position.y);
    this.p5.rotate(this.rotation);
    this.p5.image(this.img, 0, 0, this.diameter, this.diameter);
    this.p5.pop();
  }

  public isDead(): boolean {
   return this.opacity < 0;
  }
}
