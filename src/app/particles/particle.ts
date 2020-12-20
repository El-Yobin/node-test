import { p5InstanceExtensions } from 'p5';
import { RigidBody } from '../common/rigidBody';

export class Particle extends RigidBody{
  public position;
  public diameter;
  private opacity = 255;
  private rotation: number;

  constructor(
   public p5: p5InstanceExtensions,
   public img: any,
   private x,
   private y,
) {
    super(p5);
    this.position = this.p5.createVector(x, y);
    this.diameter = 50;
    this.rotation = this.p5.random(this.p5.PI * 2);
    this.applyForce(this.p5.createVector(this.p5.mouseX -  this.p5.width / 2, this.p5.mouseY - this.p5.height / 2).div(20));
  }

  public show(): void {
    this.applyGravity(-.4);
    this.p5.imageMode(this.p5.CENTER);
    this.p5.tint(255, this.opacity);
    this.p5.image(this.img, this.position.x, this.position.y, this.diameter, this.diameter);
    this.opacity -= this.p5.deltaTime / 4;
    this.diameter += this.p5.deltaTime / 4;
  }

  public isDead(): boolean {
   return this.opacity < 0;
  }
}
