import { RegisterOptions } from "react-hook-form";

const EMAIL_REGEX_PATTERN = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;

const FULL_NAME_PATTERN = /(?=^.{0,40}$)^[a-zA-Z-]+\s[a-zA-Z-]+$/;

export const Validations: {
  [x: string]: RegisterOptions;
} = {
  name: {
    required: { value: true, message: "Enter full name" },
    minLength: {
      value: 4,
      message: "Full name cannot be less than 4 characters",
    },
    pattern: {
      value: FULL_NAME_PATTERN,
      message: "Full name must be in the correct format e.g. John Doe ",
    },
  },
  company: {
    required: { value: true, message: "Enter company name" },
    minLength: 2,
  },
  emailAddress: {
    required: { value: true, message: "Enter email address" },
    pattern: {
      value: EMAIL_REGEX_PATTERN,
      message: "Must be an email",
    },
  },
  country: {
    required: { value: true, message: "Enter country name" },
    minLength: 3,
  },
  phone: {
    required: { value: true, message: "Enter phone" },
    pattern: {
      value: /^\d{10}$/,
      message: "Phone number must be 10 digits",
    },
  },
  password: {
    required: { value: true, message: "Enter a password" },
    minLength: {
      value: 8,
      message: "Password must be at least 8 characters long",
    },
  },
  oneTimeCode: {
    required: { value: true, message: "Enter your one-time code" },
    pattern: {
      value: /^\d{6}$/,
      message: "One-time code is a 6 digit number",
    },
  },
};
