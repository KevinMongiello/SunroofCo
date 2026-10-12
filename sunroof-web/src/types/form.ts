export interface FieldConfig<T> {
  id: string;
  label: string;
  inputType: string;
  error?: string;
  step?: number | "any";
  placeholder?: string;
  options?: { value: string; label: string }[];
  value: T;
  onChange: (val: string) => void;
}
