import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  ICellEditorAngularComp
} from 'ag-grid-angular';

import {
  ICellEditorParams
} from 'ag-grid-community';

@Component({
  selector: 'select-field',
  templateUrl: './editable-select-field.component.html',
  styleUrls: ['./editable-select-field.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GoalSelectEditorComponent implements ICellEditorAngularComp {
  @ViewChild('goalSelect', { read: ElementRef })
  private selectField: ElementRef;

  public selectedGoal: string;

  public agInit(params: ICellEditorParams): void {
    this.selectedGoal = params.value;
  }

  public afterGuiAttached() {
    this.selectField.nativeElement.focus();
  }

  public getValue() {
    return this.selectedGoal;
  }
}
