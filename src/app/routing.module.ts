import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ParticlesComponent } from './particles/particles.component';
import { AutonomousAgentsComponent } from './autonomous-agents/autonomous-agents.component';

const routes: Routes = [
  { path: 'particles', component: ParticlesComponent },
  { path: 'autonomous-agents', component: AutonomousAgentsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
