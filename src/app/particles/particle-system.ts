import { Particle } from './particle';
import { Queue } from '../common/queue';

export class ParticleSystem {
  private queue: Queue<Particle>;
  private noiseOffset = 0;

  constructor(
  ) {
    this.queue = new Queue();
  }

  public addParticle(particle: Particle): void {
    this.queue.add(particle);
  }

  public run(p5): void {
    this.queue.getAllAsArray().forEach(particle => {
      particle.acceleration.add((p5.noise(this.noiseOffset) - 0.5) * 2);
      particle.update();
      particle.show();

      if (particle.isDead()) {
        this.queue.get();
      }
    });

    this.noiseOffset += 0.5;
  }
}
