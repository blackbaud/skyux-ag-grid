import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { DataManagerVisualComponent } from './visual/data-manager/data-manager-visual.component';

import { VisualComponent } from './visual/visual.component';

const routes: Routes = [
  {
    path: 'visual',
    component: VisualComponent
  },
  {
    path: 'visual/data-manager',
    component: DataManagerVisualComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
