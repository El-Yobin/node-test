import { p5InstanceExtensions } from 'p5';
import { FIELD_SIZE } from './game-socket.service';

export class Blob {
  constructor(
    private p5: p5InstanceExtensions,
    private x: number,
    private y: number,
    public radius: number,
    public color,
    public id?: any,
  ) {
  }
  private speed = 10;
  public position = this.p5.createVector(this.x , this.y);

  public show(): void {
    this.p5.stroke('#000000');
    this.p5.strokeWeight(1);
    this.p5.fill(this.color);
    this.p5.circle(this.position.x, this.position.y, this.radius);
  }

  public update(): void {
    const relativeMousePos = this.p5.createVector(this.p5.mouseX - this.p5.width / 2, this.p5.mouseY - this.p5.height / 2).div(30);
    relativeMousePos.limit(this.speed);
    this.position.add(relativeMousePos);
  }

  public constrain(): void {
    this.position.x = this.p5.constrain(this.position.x, -FIELD_SIZE, FIELD_SIZE);
    this.position.y = this.p5.constrain(this.position.y, -FIELD_SIZE, FIELD_SIZE);
  }

  public eats(another: Blob): boolean {
    const distance = this.position.dist(another.position);
    return this.applyEat(distance, another);
  }

  private applyEat(distance: any, another: any): boolean {
    if (distance < this.radius - another.radius) {
      const sumOfRadii = this.radius + another.radius;
      this.radius = this.p5.lerp(this.radius, sumOfRadii, 0.1);
      return true;
    } else {
      return false;
    }
  }
}
