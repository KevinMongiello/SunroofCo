import type { MouseEvent, SubmitEvent } from "react";
import type { FieldConfig } from "../../types/form";
import "./Form.css";

interface DynamicFormConfig<T> {
  fieldConfigs: FieldConfig<T>[];
  submitLabel: string;
  cancelLabel: string;
  noValidate?: boolean;
  isSubmitting?: boolean;
  submitError?: string;
  onSubmit: (e: SubmitEvent) => void;
  onCancel: (e: MouseEvent) => void;
}

export function DynamicForm({
  fieldConfigs,
  submitLabel,
  cancelLabel,
  onSubmit,
  onCancel,
  noValidate = false,
  isSubmitting = false,
  submitError,
}: DynamicFormConfig<number | string>) {
  const fields = fieldConfigs.map((fieldConfig) => (
    <div className="form-field" key={fieldConfig.id}>
      <label htmlFor={fieldConfig.id}>{fieldConfig.label}</label>
      {fieldConfig.inputType === "select" ? (
        <select
          id={fieldConfig.id}
          onChange={(e) => fieldConfig.onChange(e.target.value)}
          value={fieldConfig.value}
          aria-invalid={fieldConfig.error ? true : undefined}
          aria-describedby={fieldConfig.error ? `${fieldConfig.id}-error` : undefined}
        >
          <option value="" disabled>{fieldConfig.placeholder ?? "Select an option"}</option>
          {fieldConfig.options?.map((option) => (
            <option key={option.value} value={option.value}>{option.label}</option>
          ))}
        </select>
      ) : (
        <input
          id={fieldConfig.id}
          type={fieldConfig.inputType || "text"}
          onChange={(e) => fieldConfig.onChange(String(e.target.value))}
          placeholder={fieldConfig.placeholder}
          value={fieldConfig.value}
          step={fieldConfig.step}
          aria-invalid={fieldConfig.error ? true : undefined}
          aria-describedby={fieldConfig.error ? `${fieldConfig.id}-error` : undefined}
        />
      )}
      {fieldConfig.error && (
        <p id={`${fieldConfig.id}-error`} className="form-error" role="alert">
          {fieldConfig.error}
        </p>
      )}
    </div>
  ));
  return (
    <form onSubmit={onSubmit} noValidate={noValidate}>
      {fields}
      {submitError && <p className="form-error" role="alert">{submitError}</p>}
      <div className="form-actions">
        <button
          type="button"
          onClick={onCancel}
          className="button button--secondary"
        >
          {cancelLabel}
        </button>
        <button type="submit" className="button button--primary" disabled={isSubmitting}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
