interface FieldConfig<T> {
  id: string;
  label: string;
  inputType: string;
  onChange: (val: string) => void;
  validation?: any;
  placeholder?: string;
  value: T;
}

interface DynamicFormConfig<T> {
  fieldConfigs: FieldConfig<T>[];
  onSubmit: (e: React.SubmitEvent) => void;
  onCancel: (e: React.MouseEvent) => void;
  submitLabel: string;
  cancelLabel: string;
}

export function DynamicForm({
  fieldConfigs,
  onSubmit,
  onCancel,
  submitLabel,
  cancelLabel,
}: DynamicFormConfig<number | string>) {
  const fields = fieldConfigs.map((fieldConfig) => (
    <div>
      <label htmlFor={fieldConfig.id}>{fieldConfig.label}</label>
      <input
        id={fieldConfig.id}
        type={fieldConfig.inputType || "text"}
        onChange={(e) => fieldConfig.onChange(String(e.target.value))}
        placeholder={fieldConfig.placeholder}
        value={fieldConfig.value}
      />
    </div>
  ));
  return (
    <form onSubmit={onSubmit}>
      {fields}
      <button type="button" onClick={onCancel}>
        {cancelLabel}
      </button>
      <button type="submit">{submitLabel}</button>
    </form>
  );
}
