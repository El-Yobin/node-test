import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './routing.module';
import { ParticlesComponent } from './particles/particles.component';
import { AutonomousAgentsComponent } from './autonomous-agents/autonomous-agents.component';
import { GeneticAlgorithmComponent } from './genetic-algorithm/genetic-algorithm.component';

@NgModule({
  declarations: [
    AppComponent,
    ParticlesComponent,
    AutonomousAgentsComponent,
    GeneticAlgorithmComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
