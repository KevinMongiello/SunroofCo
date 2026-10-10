export interface FieldConfig<T> {
  id: string;
  label: string;
  inputType: string;
  validation?: any;
  placeholder?: string;
  value: T;
  onChange: (val: string) => void;
}
