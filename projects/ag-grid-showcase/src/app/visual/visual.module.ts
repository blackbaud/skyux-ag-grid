import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SkyE2eThemeSelectorModule } from '@skyux/e2e-client';
import { VisualComponent } from './visual.component';



@NgModule({
  declarations: [
    VisualComponent
  ],
  imports: [
    CommonModule,
    SkyE2eThemeSelectorModule
  ]
})
export class VisualModule { }
