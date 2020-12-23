import { Queue } from './queue';
import { ShiftParticle } from '../particles/shift-particle';

export class ParticleSystem {
  private queue: Queue<any>;

  constructor(
  ) {
    this.queue = new Queue();
  }

  public emit(particle: any): void {
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
