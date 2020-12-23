import { RigidBody } from '../common/rigidBody';
import { Queue } from '../common/queue';

export class ShiftParticle extends RigidBody {
  private health = this.p5.random(5, 20);
  private history: Queue<any> = new Queue<any>();
  private spread = 0.5;

  constructor(x: number, y: number) {
    super();
    this.position.set(x, y);
  }

  public show(): void {
    this.move();
    this.p5.stroke('#009cf0');
    this.p5.point(this.position.x, this.position.y);
    this.showTail();

    this.health -= this.p5.deltaTime / 100;
  }

  private move(): void {
    this.applyForce(this.p5.createVector(this.p5.random(-this.spread, this.spread), this.p5.random(-this.spread, this.spread)));
  }

  private showTail(): void {
    this.history.add(this.position.copy());

    this.p5.noFill();
    this.p5.beginShape();
    this.history.getAllAsArray().forEach(pos => {
      this.p5.vertex(pos.x, pos.y);
    });
    this.p5.endShape();

    if (this.history.length() > 10) {
      this.history.get();
    }
  }

  public isDead(): boolean {
    return this.health < 0;
  }
}
