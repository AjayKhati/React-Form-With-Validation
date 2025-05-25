import React from "react";

export default function InputField({
  label,
  name,
  type = "text",
  value,
  onChange,
  onBlur,
  error,
  showPassword,
  toggleShowPassword,
}) {
  return (
    <div style={{ marginBottom: 10 }}>
      {label && <label htmlFor={name}>{label}</label>}
      {type === "password" ? (
        <div style={{ display: "flex", alignItems: "center" }}>
          <input
            id={name}
            type={showPassword ? "text" : "password"}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            style={{ flex: 1 }}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className="show-hide-btn"
            style={{ width: "10%", marginLeft: 5 }}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          onBlur={onBlur}
        />
      )}
      {error && <div className="error">{error}</div>}
    </div>
  );
}
