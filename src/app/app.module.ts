import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AgarComponent } from './agario/agar.component';
import { PhysicsComponent } from './physics/physics.component';
import { SpringComponent } from './spring/spring.component';

@NgModule({
  declarations: [
    AppComponent,
    AgarComponent,
    PhysicsComponent,
    SpringComponent,
  ],
  imports: [
    BrowserModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
