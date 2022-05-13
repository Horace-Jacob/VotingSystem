import { CreateAccountFields } from "./InputFields";

export const ValidateRegister = (fields: CreateAccountFields) => {
  if (!fields.email.includes("@")) {
    return [
      {
        field: "email",
        message: "Invalid Email",
      },
    ];
  }

  if (fields.secret.length !== 6) {
    return [
      {
        field: "Secret",
        message: "Invalid Secret Key",
      },
    ];
  }

  if (fields.username.trim() === "") {
    return [
      {
        field: "username",
        message: "Invalid Username",
      },
    ];
  }

  if (fields.username.length < 3) {
    return [
      {
        field: "username",
        message: "Username length must be greater than 3",
      },
    ];
  }

  if (fields.password.length < 3) {
    return [
      {
        field: "password",
        message: "Password length must be greater than 3",
      },
    ];
  }
  return null;
};
