"use client";

// ---- Shared UI primitives for the intake form ----

export type CheckboxProps = {
  checked: boolean;
  onChange: (checked: boolean) => void;
  label: string;
  description?: string;
  id?: string;
};

export function Checkbox({ checked, onChange, label, description, id }: CheckboxProps) {
  const checkboxId = id || `checkbox-${Math.random().toString(36).substr(2, 9)}`;

  return (
    <div>
      <label
        htmlFor={checkboxId}
        className="flex items-start gap-3 cursor-pointer group"
        style={{ color: "#ffdd4f" }}
      >
        <div className="relative flex-shrink-0 mt-0.5">
          <input
            type="checkbox"
            id={checkboxId}
            checked={checked}
            onChange={(e) => onChange(e.target.checked)}
            className="sr-only"
          />
          <div
            className="relative w-5 h-5 rounded-md border-1 transition-all duration-200 flex items-center justify-center group-hover:scale-110"
            style={{
              borderColor: checked ? "#a29bfe" : "#ffdd4f",
              backgroundColor: checked ? "#a29bfe" : "transparent",
              boxShadow: checked ? "0 0 0 3px rgba(162, 155, 254, 0.1)" : "none",
            }}
          >
            {checked && (
              <svg
                className="w-3.5 h-3.5 text-white"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                viewBox="0 0 24 24"
                stroke="currentColor"
                style={{ animation: "checkmark 0.2s ease-out" }}
              >
                <path d="M5 13l4 4L19 7" />
              </svg>
            )}
          </div>
        </div>
        <div className="flex-1">
          <span className="text-sm font-medium block group-hover:opacity-90 transition-opacity">
            {label}
          </span>
          {description && (
            <p
              className="text-xs mt-1 transition-opacity group-hover:opacity-80"
              style={{ opacity: 0.7 }}
            >
              {description}
            </p>
          )}
        </div>
      </label>
    </div>
  );
}

export type FieldProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
  required?: boolean;
  type?: string;
  placeholder?: string;
};

export function Field({
  label,
  value,
  onChange,
  required,
  type = "text",
  placeholder,
}: FieldProps) {
  return (
    <label className="block" style={{ marginBottom: "15px" }}>
      <span
        className="text-sm font-medium"
        style={{ color: "#ffdd4f", display: "block", marginBottom: "2px" }}
      >
        {label}
        {required && <span className="text-red-500"> *</span>}
      </span>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl text-sm focus:outline-none transition-all placeholder:text-neutral-400 bg-transparent"
        style={{ borderColor: "#ffdd4f", borderWidth: "1px", color: "#ffdd4f", padding: "12px 16px" }}
      />
    </label>
  );
}

export type TextAreaProps = {
  label: string;
  value: string;
  onChange: (v: string) => void;
};

export function TextAreaField({ label, value, onChange }: TextAreaProps) {
  return (
    <label className="block" style={{ marginBottom: "15px" }}>
      <span
        className="text-sm font-medium"
        style={{ color: "#ffdd4f", display: "block", marginBottom: "2px" }}
      >
        {label}
      </span>
      <textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        rows={4}
        className="w-full rounded-xl text-sm focus:outline-none transition-all placeholder:text-neutral-400 resize-none bg-transparent"
        style={{ borderColor: "#ffdd4f", borderWidth: "1px", color: "#ffdd4f", padding: "12px 16px" }}
      />
    </label>
  );
}

export function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-6 py-2">
      <span className="text-sm" style={{ color: "#ffdd4f" }}>
        {label}
      </span>
      <span className="font-medium text-right" style={{ color: "#ffdd4f" }}>
        {value}
      </span>
    </div>
  );
}
