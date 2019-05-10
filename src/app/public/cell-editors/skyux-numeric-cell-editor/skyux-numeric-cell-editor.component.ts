import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {
  ICellEditorAngularComp
} from 'ag-grid-angular';

import {
  ICellEditorParams
} from 'ag-grid-community';

@Component({
  selector: 'app-ag-numeric-editor',
  templateUrl: './skyux-numeric-cell-editor.component.html',
  styleUrls: ['./skyux-numeric-cell-editor.component.scss']
})
export class SkyuxNumericCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {
  public value: number;
  private params: ICellEditorParams;

  @ViewChild('numericInput', {read: ViewContainerRef}) public input: any;

  public agInit(params: ICellEditorParams): void {
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
