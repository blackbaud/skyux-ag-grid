import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {
  ICellEditorAngularComp
} from 'ag-grid-angular';

@Component({
  selector: 'sky-cell-editor-numeric',
  templateUrl: './cell-editor-number.component.html',
  styleUrls: ['./cell-editor-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SkyCellEditorNumberComponent implements ICellEditorAngularComp, AfterViewInit {
  public value: number;
  private params: any;

  @ViewChild('numericInput', {read: ViewContainerRef}) public input: any;

  public agInit(params: any): void {
    this.params = params;
    this.value = this.params.value;
  }

  public getValue(): any {
    return this.value;
  }

  public ngAfterViewInit() {
    setTimeout(() => {
      this.input.element.nativeElement.focus();
    });
  }
}
