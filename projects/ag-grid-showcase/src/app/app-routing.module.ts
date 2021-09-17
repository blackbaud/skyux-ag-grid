import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DataManagerVisualComponent } from './visual/data-manager/data-manager-visual.component';
import { EditComplexCellsComponent } from './visual/edit-complex-cells/edit-complex-cells.component';
import { SkyAgGridEditModalComponent } from './visual/edit-in-modal-grid/ag-grid-edit-modal.component';
import { EditStopWhenLosesFocusComponent } from './visual/edit-stop-when-loses-focus/edit-stop-when-loses-focus.component';
import { EditableGridComponent } from './visual/editable-grid/editable-grid.component';
import { ReadonlyGridComponent } from './visual/readonly-grid/readonly-grid.component';
import { VisualComponent } from './visual/visual.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'visual'
  },
  {
    path: 'visual',
    component: VisualComponent
  },
  {
    path: 'visual/data-manager',
    component: DataManagerVisualComponent
  },
  {
    path: 'visual/edit-complex-cells',
    component: EditComplexCellsComponent
  },
  {
    path: 'visual/edit-in-modal-grid',
    component: SkyAgGridEditModalComponent
  },
  {
    path: 'visual/edit-stop-when-loses-focus',
    component: EditStopWhenLosesFocusComponent
  },
  {
    path: 'visual/editable-grid',
    component: EditableGridComponent
  },
  {
    path: 'visual/readonly-grid',
    component: ReadonlyGridComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
