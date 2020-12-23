import { AfterViewInit, Component } from '@angular/core';
import { P5JSInvoker } from '../common/p5JSInvoker';
import { ParticleSystem } from '../common/particle-system';
import { P5InstanceService } from '../common/p5-instance.service';
import { ShiftParticle } from './shift-particle';

@Component({
  selector: 'app-particles',
  templateUrl: '../common/template/template.component.html',
  styleUrls: ['../common/template/template.component.scss'],
})
export class ParticlesComponent extends P5JSInvoker implements AfterViewInit {
  private canvas: any;
  private p5Instance: any;
  private particleSystem: ParticleSystem;

  constructor() {
    super();
    this.particleSystem = new ParticleSystem();
  }

  public ngAfterViewInit(): void {
    this.startP5JS(document.getElementById('container'));
  }

  public preload(p5): void {
  }

  public setup(p5): void {
    this.p5Instance = p5;
    P5InstanceService.p5Instance = p5;
    this.canvas = p5.createCanvas(1000, 600);
    this.canvas.mouseClicked(() => this.mouseListener());
  }

  public draw(p5): void {
    this.canvas.background(0);
    this.particleSystem.run();
  }

  private mouseListener(): void {
    for (let i = 0; i < 20; i++) {
      const x = this.p5Instance.mouseX;
      const y = this.p5Instance.mouseY;
      this.particleSystem.emit(new ShiftParticle(x, y));
    }
  }
}
