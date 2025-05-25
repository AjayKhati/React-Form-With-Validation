import React from "react";

export default function SelectField({
  label,
  name,
  value,
  onChange,
  onBlur,
  options = [],
  disabled = false,
  error,
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      {label && <label htmlFor={name}>{label}</label>}
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        disabled={disabled}
      >
        <option value="">{`Select ${label}`}</option>
        {options.map(({ value: optValue, label: optLabel }) => (
          <option key={optValue} value={optValue}>
            {optLabel}
          </option>
        ))}
      </select>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
