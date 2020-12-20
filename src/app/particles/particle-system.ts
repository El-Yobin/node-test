import { Particle } from './particle';

export class ParticleSystem {
  private particles: Particle[];

  constructor() {
    this.particles = [];
  }

  public addParticle(particle: Particle): void {
    this.particles.unshift(particle);
  }

  public run(): void {
    this.particles.forEach(particle => {
      particle.applyGravity(0.5);
      particle.update();
      particle.show();

      if (particle.isDead()) {
        this.particles.pop();
      }
    });
  }
}
