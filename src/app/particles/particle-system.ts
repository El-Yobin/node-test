import { Particle } from './particle';
import { Queue } from '../common/queue';

export class ParticleSystem {
  private queue: Queue;

  constructor() {
    this.queue = new Queue();
  }

  public addParticle(particle: Particle): void {
    this.queue.add(particle);
  }

  public run(): void {
    this.queue.getAllAsArray().forEach(particle => {
      particle.update();
      particle.show();

      if (particle.isDead()) {
        this.queue.get();
      }
    });
  }
}
