import { Component, OnInit } from '@angular/core';
import { P5JSInvoker } from '../p5JSInvoker';
import * as p5Methods from 'p5';

@Component({
  selector: 'app-rotation',
  templateUrl: './rotation.component.html',
  styleUrls: ['./rotation.component.scss']
})
export class RotationComponent extends P5JSInvoker implements OnInit {
  public p5: any;

  constructor() {
    super();
    this.startP5JS(document.getElementById('container'));
  }

  ngOnInit(): void {
  }

  preload(p5): void {
    this.p5 = p5.createCanvas(1000, 600);
  }

  setup(p5): void {
  }

  draw(p5): void {
  }

}
