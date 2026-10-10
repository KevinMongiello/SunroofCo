import type { MouseEvent, SubmitEvent } from "react";
import type { FieldConfig } from "../../types/form";
import "./Form.css";

interface DynamicFormConfig<T> {
  fieldConfigs: FieldConfig<T>[];
  submitLabel: string;
  cancelLabel: string;
  onSubmit: (e: SubmitEvent) => void;
  onCancel: (e: MouseEvent) => void;
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
