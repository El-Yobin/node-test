import { AfterViewInit, Component } from '@angular/core';
import { P5JSInvoker } from '../common/p5JSInvoker';
import { ParticleSystem } from './particle-system';
import { Particle } from './particle';
import { P5InstanceService } from '../common/p5-instance.service';

@Component({
  selector: 'app-particles',
  templateUrl: '../common/template/template.component.html',
  styleUrls: ['../common/template/template.component.scss'],
})
export class ParticlesComponent extends P5JSInvoker implements AfterViewInit {
  private canvas: any;
  private p5Instance: any;
  private particleSystem: ParticleSystem;
  private particleImage: any;

  constructor() {
    super();
    this.particleSystem = new ParticleSystem();
  }

  public ngAfterViewInit(): void {
    this.startP5JS(document.getElementById('container'));
  }

  public preload(p5): void {
   this.particleImage = p5.loadImage('../assets/smoke.png');
  }

  public setup(p5): void {
    this.p5Instance = p5;
    P5InstanceService.p5Instance = p5;
    this.canvas = p5.createCanvas(1000, 600, p5.WEBGL);
    this.canvas.frameRate = 60;
  }

  public draw(p5): void {
    this.canvas.background(0);
    this.particleSystem.addParticle(new Particle(this.particleImage, 0, 0));
    this.particleSystem.run(this.p5Instance);
  }
}
