import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgarComponent } from './agario/agar.component';
import { PlanetsComponent } from './planets/planets.component';
import { SpringComponent } from './spring/spring.component';
import { ParticlesComponent } from './particles/particles.component';

const routes: Routes = [
  { path: 'agario', component: AgarComponent },
  { path: 'planets', component: PlanetsComponent },
  { path: 'spring', component: SpringComponent },
  { path: 'particles', component: ParticlesComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
