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
  private mousePosition: any;
  private agents: Agent[] = [];

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
    for (let i = 0; i < 50; i++) {
      this.agents.push(new Agent(p5));
    }
  }

  public draw(p5): void {
    this.mousePosition = this.p5Instance.createVector(
      this.p5Instance.mouseX,
      this.p5Instance.mouseY
    );
    this.updateScene();
    this.updateAgent();
  }

  private updateAgent(): void {
    this.agents.forEach(agent => {
      this.agents.forEach(current => {
        if (current !== agent) {
          agent.avoid(current);
        }
      });
      agent.seek(this.mousePosition);
      agent.update();
      agent.show();
    });
  }

  private updateScene(): void {
    this.canvas.background(200);
  }
}
