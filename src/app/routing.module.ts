import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AgarComponent } from './agario/agar.component';
import { PhysicsComponent } from './physics/physics.component';
import { SpringComponent } from './spring/spring.component';

const routes: Routes = [
  { path: 'agario', component: AgarComponent },
  { path: 'physics', component: PhysicsComponent },
  { path: 'spring', component: SpringComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
