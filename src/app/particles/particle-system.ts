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
      particle.applyAirResistance(0.05);
      particle.update();
      particle.show();

      if (particle.isDead()) {
        this.particles.pop();
      }
    });
  }
}
