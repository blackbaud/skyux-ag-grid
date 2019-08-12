import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';

import {
  SkyLibResourcesService
} from '@skyux/i18n';

import {
  ICellEditorAngularComp
} from 'ag-grid-angular';

import {
  ICellEditorParams
} from 'ag-grid-community';

import {
  Subject
} from 'rxjs/Subject';

@Component({
  selector: 'sky-ag-grid-cell-editor-number',
  templateUrl: './cell-editor-number.component.html',
  styleUrls: ['./cell-editor-number.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class SkyAgGridCellEditorNumberComponent implements ICellEditorAngularComp, OnInit, OnDestroy {
  public value: number;
  public numberInputLabel: string;
  private params: ICellEditorParams;
  private columnHeader: string;
  private rowNumber: number;
  private ngUnsubscribe = new Subject<void>();

  @ViewChild('skyCellEditorNumber', {read: ElementRef})
  public input: ElementRef;

  constructor(private libResources: SkyLibResourcesService) { }

  public agInit(params: ICellEditorParams): void {
    this.params = params;
    this.value = this.params.value;
    this.columnHeader = this.params.colDef.headerName;
    this.rowNumber = this.params.rowIndex + 1;
  }

  public ngOnInit(): void {
    this.libResources.getString('skyux_ag_grid_cell_editor_number_aria_label', this.columnHeader, this.rowNumber)
    .takeUntil(this.ngUnsubscribe)
    .subscribe(label => {
      this.numberInputLabel = label;
    });
  }

  public ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }

  public getValue(): number {
    return this.value;
  }

  public afterGuiAttached(): void {
    this.input.nativeElement.focus();
  }
}
