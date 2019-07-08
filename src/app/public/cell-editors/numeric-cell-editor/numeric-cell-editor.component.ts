import {
  AfterViewInit,
  Component,
  ViewChild,
  ViewContainerRef
} from '@angular/core';

import {
  ICellEditorAngularComp
} from 'ag-grid-angular';

@Component({
  selector: 'app-ag-numeric-editor',
  templateUrl: './numeric-cell-editor.component.html',
  styleUrls: ['./numeric-cell-editor.component.scss']
})
export class SkyuxNumericCellEditorComponent implements ICellEditorAngularComp, AfterViewInit {
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
