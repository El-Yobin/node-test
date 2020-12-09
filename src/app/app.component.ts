import {Component, OnInit, ViewChild} from '@angular/core';
import { P5JSInvoker } from './p5JSInvoker';
import {SocketService} from './socket.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent extends P5JSInvoker implements OnInit{
  @ViewChild('container') private container: HTMLElement;
  public userColor = '#ffffff';
  private p5: any;
  constructor(
    private socketService: SocketService,
  ) {
    super();
    this.startP5JS(this.container);
  }

  public ngOnInit(): void {

  }

  public preload(p5): void {
  }

  public setup(p5): void {
    this.p5 = p5.createCanvas(500, 500);
    this.receiveMouseDraw(p5);
    p5.background(55);
  }

  public draw(p5): void {
    if (p5.mouseIsPressed) {
      this.sendMouseDraw(p5.mouseX, p5.mouseY, this.userColor);
      p5.circle(p5.mouseX, p5.mouseY, 20);
      p5.fill(this.userColor);
    }
  }

  private sendMouseDraw(x: number, y: number, color: string): void {
    this.socketService.emit('draw', { x, y, color });
  }

  private receiveMouseDraw(p5): void {
    this.socketService.listen('serverDraw').subscribe(data => {
      const circle = p5.circle(data.x, data.y, 20);
      circle.fill(data.color);
    });
  }
}
