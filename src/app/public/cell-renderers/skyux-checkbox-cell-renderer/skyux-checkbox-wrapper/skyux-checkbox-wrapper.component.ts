import {
  Component,
  Input
} from '@angular/core';

import {
  RowNode
} from 'ag-grid-community';

@Component({
  selector: 'skyux-checkbox-wrapper',
  templateUrl: './skyux-checkbox-wrapper.component.html'
})
export class SkyuxCheckboxWrapperComponent {
  @Input()
  public checked: boolean;
  @Input()
  public rowNode: RowNode;

  public onClick() {
    this.rowNode.setSelected(this.checked);
  }
}
