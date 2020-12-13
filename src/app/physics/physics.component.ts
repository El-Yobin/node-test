import { AfterViewInit, Component } from '@angular/core';
import { P5JSInvoker } from '../p5JSInvoker';

@Component({
  selector: 'app-physics',
  templateUrl: './physics.component.html',
  styleUrls: ['../agario/agar.component.scss']
})
export class PhysicsComponent extends P5JSInvoker implements AfterViewInit {
  private p5;

  constructor() {
    super();
  }

  ngAfterViewInit(): void {
    this.startP5JS(document.getElementById('container'));
  }

  preload(p5): void {
  }

  setup(p5): void {
    this.p5 = p5.createCanvas(1024, 700);
  }

  draw(p5): void {
  }

}
