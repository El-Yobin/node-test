import { AfterViewInit, Component } from '@angular/core';
import { P5JSInvoker } from '../common/p5JSInvoker';
import { Agent } from './agent';

@Component({
  selector: 'app-autonomous-agents',
  templateUrl: '../common/template/template.component.html',
  styleUrls: ['../common/template/template.component.scss']
})
export class AutonomousAgentsComponent extends P5JSInvoker implements AfterViewInit {

  private canvas: any;
  private p5Instance: any;
  private agent: Agent;

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
    this.agent = new Agent(p5);
  }

  public draw(p5): void {
    this.updateScene();
    this.updateAgent();
  }

  private updateAgent(): void {
    const mousePos = this.p5Instance.createVector(
      this.p5Instance.mouseX,
      this.p5Instance.mouseY
    );
    this.agent.seek(mousePos);
    this.agent.update();
    this.agent.show();
  }

  private updateScene(): void {
    this.canvas.background(200);
  }
}
