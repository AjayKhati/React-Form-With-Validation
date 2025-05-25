import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputField from "./InputField";
import SelectField from "./SelectField";
import { countryCityData, countryCodes } from "../data/countryCityData";
import { saveToLocalStorage } from "../utils/storage";

const inputFields = [
  { name: "firstName", label: "First Name", type: "text" },
  { name: "lastName", label: "Last Name", type: "text" },
  { name: "username", label: "Username", type: "text" },
  { name: "email", label: "Email", type: "email" },
  { name: "password", label: "Password", type: "password" },
  { name: "phoneNumber", label: "Phone Number", type: "text" },
  { name: "pan", label: "PAN Number", type: "text" },
  { name: "aadhar", label: "Aadhar Number", type: "text" },
];

const validateForm = (data) => {
  const errors = {};

  if (!data.firstName.trim()) errors.firstName = "Required";
  if (!data.lastName.trim()) errors.lastName = "Required";
  if (!data.username.trim()) errors.username = "Required";

  if (!data.email.trim()) {
    errors.email = "Required";
  } else if (!/\S+@\S+\.\S+/.test(data.email)) {
    errors.email = "Invalid email";
  }

  if (!data.password) {
    errors.password = "Required";
  } else if (data.password.length < 8) {
    errors.password = "Minimum 8 characters required";
  } else if (
    !/[A-Z]/.test(data.password) ||
    !/[a-z]/.test(data.password) ||
    !/[0-9]/.test(data.password) ||
    !/[!@#$%^&*(),.?":{}|<>]/.test(data.password)
  ) {
    errors.password =
      "Must include uppercase, lowercase, number, and special character";
  }

  if (!data.country) errors.country = "Required";
  if (!data.city) errors.city = "Required";
  if (!data.countryCode) errors.countryCode = "Required";

  if (!data.phoneNumber.trim()) {
    errors.phoneNumber = "Required";
  } else if (!/^\d{7,15}$/.test(data.phoneNumber)) {
    errors.phoneNumber = "Invalid phone number";
  }

  if (!data.pan.trim()) {
    errors.pan = "Required";
  } else if (!/^[A-Z]{5}[0-9]{4}[A-Z]$/.test(data.pan)) {
    errors.pan = "Invalid PAN format";
  }

  if (!data.aadhar.trim()) {
    errors.aadhar = "Required";
  } else if (!/^\d{12}$/.test(data.aadhar)) {
    errors.aadhar = "Invalid Aadhar format";
  }

  return errors;
};

export default function RegistrationForm() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    showPassword: false,
    country: "",
    city: "",
    countryCode: "",
    phoneNumber: "",
    pan: "",
    aadhar: "",
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((f) => ({
      ...f,
      [name]: value,
      ...(name === "country"
        ? { city: "", countryCode: countryCodes[value] || "" }
        : {}),
    }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((t) => ({ ...t, [name]: true }));
    setErrors(validateForm({ ...formData, [name]: formData[name] }));
  };

  const toggleShowPassword = () =>
    setFormData((f) => ({ ...f, showPassword: !f.showPassword }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    const newErrors = validateForm(formData);
    setErrors(newErrors);
    if (Object.keys(newErrors).length === 0) {
      saveToLocalStorage("userData", formData);
      navigate("/user-details", { state: formData });
    }
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <form onSubmit={handleSubmit} noValidate style={{ maxWidth: 450, margin: "auto" }}>
      <h2>Registration Form</h2>

      {inputFields.map(({ name, label, type }) => (
        <InputField
          key={name}
          name={name}
          label={label}
          type={type}
          value={formData[name]}
          onChange={handleChange}
          onBlur={handleBlur}
          error={(submitted || touched[name]) && errors[name]}
          showPassword={formData.showPassword}
          toggleShowPassword={toggleShowPassword}
        />
      ))}

      <SelectField
        name="country"
        label="Country"
        value={formData.country}
        onChange={handleChange}
        onBlur={handleBlur}
        options={Object.keys(countryCityData).map((c) => ({ value: c, label: c }))}
        error={(submitted || touched.country) && errors.country}
      />

      <SelectField
        name="city"
        label="City"
        value={formData.city}
        onChange={handleChange}
        onBlur={handleBlur}
        options={
          formData.country
            ? countryCityData[formData.country].map((city) => ({ value: city, label: city }))
            : []
        }
        disabled={!formData.country}
        error={(submitted || touched.city) && errors.city}
      />

      <SelectField
        name="countryCode"
        label="Country Code"
        value={formData.countryCode}
        onChange={handleChange}
        onBlur={handleBlur}
        options={Object.entries(countryCodes).map(([country, code]) => ({
          value: code,
          label: `${country} (${code})`,
        }))}
        error={(submitted || touched.countryCode) && errors.countryCode}
      />

      <button
        type="submit"
        disabled={!isValid}
        style={{
          backgroundColor: isValid ? "#007bff" : "#ccc",
          color: "white",
          padding: "10px",
          borderRadius: 4,
          cursor: isValid ? "pointer" : "not-allowed",
          border: "none",
          marginTop: "1rem",
        }}
      >
        Submit
      </button>
    </form>
  );
}
