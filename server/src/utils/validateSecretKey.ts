export const ValidateSecretKey = (secret: string) => {
  if (secret.length !== 6) {
    return [
      {
        field: "secret",
        message: "Invalid Secret Key Length",
      },
    ];
  }
  return null;
};
