import "./Form.css";

interface FieldConfig<T> {
  id: string;
  label: string;
  inputType: string;
  validation?: any;
  placeholder?: string;
  value: T;
  onChange: (val: string) => void;
}

interface DynamicFormConfig<T> {
  fieldConfigs: FieldConfig<T>[];
  submitLabel: string;
  cancelLabel: string;
  onSubmit: (e: React.SubmitEvent) => void;
  onCancel: (e: React.MouseEvent) => void;
}

export function DynamicForm({
  fieldConfigs,
  submitLabel,
  cancelLabel,
  onSubmit,
  onCancel,
}: DynamicFormConfig<number | string>) {
  const fields = fieldConfigs.map((fieldConfig) => (
    <div className="form-field">
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
      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
          className="button button--secondary"
        >
          {cancelLabel}
        </button>
        <button type="submit" className="button button--primary">
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
