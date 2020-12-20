import { AfterViewInit, Component } from '@angular/core';
import { P5JSInvoker } from '../common/p5JSInvoker';
import { ParticleSystem } from './particle-system';
import { Particle } from './particle';
import * as p5Methods from 'p5';

@Component({
  selector: 'app-particles',
  templateUrl: '../common/template/template.component.html',
  styleUrls: ['../common/template/template.component.scss']
})
export class ParticlesComponent extends P5JSInvoker implements AfterViewInit {
  private canvas: any;
  private p5Instance: any;
  private particleSystem: ParticleSystem;

  constructor() {
    super();
  }

  public ngAfterViewInit(): void {
    this.startP5JS(document.getElementById('container'));
  }

  public preload(p5): void {
  }

  public setup(p5): void {
    this.p5Instance = p5;
    this.canvas = p5.createCanvas(1000, 600);
    this.particleSystem = new ParticleSystem();
    this.canvas.mouseClicked((event) => this.mouseClicked(event));
  }

  public draw(p5): void {
    this.canvas.background(0);
    this.particleSystem.run();
  }

  private mouseClicked(event): void {
    for (let i = 0; i < 20; i++) {
      this.particleSystem.addParticle(new Particle(this.p5Instance, event.layerX, event.layerY));
    }
  }
}
