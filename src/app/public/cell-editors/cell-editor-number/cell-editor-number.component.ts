import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  ViewChild
} from '@angular/core';

import {
  ICellEditorAngularComp
} from 'ag-grid-angular';

@Component({
  selector: 'sky-cell-editor-numeric',
  templateUrl: './cell-editor-number.component.html',
  styleUrls: ['./cell-editor-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.Default
})
export class SkyCellEditorNumberComponent implements ICellEditorAngularComp {
  public value: number;
  public label: string;
  private params: any;

  @ViewChild('skyCellEditorNumeric', {read: ElementRef})
  public input: ElementRef;

  public agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;
    this.label = this.params.label;
  }

  public getValue(): any {
    return this.value;
  }

  public afterGuiAttached() {
    this.input.nativeElement.focus();
  }
}
