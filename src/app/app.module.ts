import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgarComponent } from './agario/agar.component';
import { PlanetsComponent } from './planets/planets.component';
import { SpringComponent } from './spring/spring.component';
import { AppRoutingModule } from './routing.module';
import { ParticlesComponent } from './particles/particles.component';
import { AutonomousAgentsComponent } from './autonomous-agents/autonomous-agents.component';

@NgModule({
  declarations: [
    AppComponent,
    AgarComponent,
    PlanetsComponent,
    SpringComponent,
    ParticlesComponent,
    AutonomousAgentsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
