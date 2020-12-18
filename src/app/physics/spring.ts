import * as p5Methods from 'p5';

export function calculateSpringForce(
  object: any,
  origin: p5Methods.Vector,
  restLength: number,
  coefficient: number,
  ): p5Methods.Vector {
  const springForce = p5Methods.Vector.sub(object.position, origin);
  const currentLength = springForce.mag();
  const displacement = currentLength - restLength;

  return springForce.normalize().mult(-coefficient * displacement);
}
