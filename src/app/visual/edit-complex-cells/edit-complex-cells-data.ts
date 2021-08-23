export class EditableGridRow {
  public name: string;
  public language: 'English' | 'Spanish' | 'French' | 'Portuguese' | '(other)';
  public text: string;
  public validationText: string;
  public validationDate: Date;
}

function getDay(i: number) {
  const TODAY = new Date();
  const ret = new Date();
  ret.setDate(TODAY.getDate() - 5 + i);
  return ret;
}

export const EDITABLE_GRID_DATA: EditableGridRow[] = Array.from(Array(10).keys()).map((i) => {
  return {
    name: `Person ${i + 1}`,
    language: 'English',
    text: '',
    validationText: (i % 3 === 0 ? 'valid' : ''),
    validationDate: getDay(i + 1)
  };
});
