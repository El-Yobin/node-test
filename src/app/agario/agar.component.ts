import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import { FIELD_SIZE, GameSocketService } from './game-socket.service';
import { P5JSInvoker } from '../common/p5JSInvoker';
import { Blob } from './blob';


@Component({
  selector: 'app-agar',
  templateUrl: '../common/template.component.html',
  styleUrls: ['../common/template.component.scss']
})
export class AgarComponent extends P5JSInvoker implements AfterViewInit, OnDestroy {
  constructor(
    private socketService: GameSocketService,
  ) {
    super();
  }
  private p5: any;
  private player: Blob;
  private blobs: Blob[] = [];
  private enemies: any = [];
  private zoom = 0;

  public ngAfterViewInit(): void {
    this.startP5JS(document.getElementById('container'));
  }


  public preload(p5): void {
  }

  public setup(p5): void {
    this.p5 = p5.createCanvas(1000, 600);
    this.createPlayer(p5);
    this.generateBlobs(p5, FIELD_SIZE / 10);
    // this.subscribeToHeartbeat();
  }

  public draw(p5): void {
    this.updateCamera(p5);
    this.updateBlobs(p5);
    this.updatePlayer();
    this.updatePlayers(p5);
  }

  private createPlayer(p5): void {
    const [r, g, b] = [p5.random(255), p5.random(255), p5.random(255)];

    this.player = new Blob(p5, p5.random(-FIELD_SIZE, FIELD_SIZE), p5.random(-FIELD_SIZE, FIELD_SIZE), 64, [r, g, b]);
    this.sendNewPlayer();
  }

  private updatePlayer(): void {
    this.player.update();
    this.player.constrain();
    this.player.show();
    this.socketService.emit('update', {
      x: this.player.position.x,
      y: this.player.position.y,
      radius: this.player.radius
    });
  }

  private generateBlobs(p5, count: number): void {
    for (let i = 0; i < count; i++) {
      const [r, g, b] = [p5.random(255), p5.random(255), p5.random(255)];
      const blob = new Blob(
        p5,
        p5.random(-FIELD_SIZE, FIELD_SIZE),
        p5.random(-FIELD_SIZE, FIELD_SIZE),
        p5.random(20, 40),
        [r, g, b]
      );
      this.blobs.push(blob);
    }
  }


  private updateBlobs(p5): void {
    this.blobs.forEach(currentBlob => {
      if (this.player.eats(currentBlob)) {
       this.blobs = this.blobs.filter(blob => currentBlob !== blob);
      }
      currentBlob.show();
    });

    if (this.blobs.length < FIELD_SIZE / 30) {
      this.generateBlobs(p5, FIELD_SIZE / 15);
    }
  }

  private updatePlayers(p5): void {
    if (this.enemies.length > 1) {
      this.enemies.forEach(enemy => {
        if (enemy.id !== this.socketService.socket.id) {
          p5.noStroke();
          p5.fill(enemy.color);
          p5.circle(enemy.x, enemy.y, enemy.radius);
        }
      });
    }
  }

  private updateCamera(p5): void {
    this.p5.background(55);
    p5.translate(this.p5.width / 2, this.p5.height / 2);
    const newZoom = 64 / this.player.radius;
    this.zoom = p5.lerp(this.zoom, newZoom, 0.025);
    p5.scale(this.zoom);
    p5.translate(-this.player.position.x, - this.player.position.y);
    p5.fill(0, 0);
    p5.stroke('#730707');
    p5.strokeWeight(4);
    p5.square(-FIELD_SIZE, -FIELD_SIZE, FIELD_SIZE * 2);
  }

  private sendNewPlayer(): void {
    this.socketService.emit('newPlayer', {
      x: this.player.position.x,
      y: this.player.position.y,
      radius: this.player.radius,
      color: this.player.color,
    });
  }

  private subscribeToHeartbeat(): void {
    this.socketService.listen('heartbeat').subscribe(data => {
      this.enemies = data;
    });
  }

  public ngOnDestroy(): void {
    this.p5.remove();
  }
}
