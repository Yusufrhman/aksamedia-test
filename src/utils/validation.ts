// Tipe untuk error validasi
export type ValidationError = {
  fullname?: string;
  username?: string;
  password?: string;
};

// Validasi fullname
export function isValidFullname(fullname: string): boolean {
  return fullname.length > 3;
}

// Validasi username
export function isValidUsername(username: string): boolean {
  return username.length > 3;
}

// Validasi password
export function isValidPassword(password: string): boolean {
  return password.length >= 6;
}

// Validasi login credentials
export function validateCredentials(
  username: string,
  password: string
): ValidationError {
  const error: ValidationError = {};

  if (!isValidUsername(username)) {
    error.username = "Username tidak valid";
  }
  if (!isValidPassword(password)) {
    error.password = "Password minimal 6 karakter";
  }

  return error;
}

// Validasi untuk update user (fullname + username)
export function validateUpdateUserInput(
  fullname: string,
  username: string
): ValidationError {
  const error: ValidationError = {};

  if (!isValidFullname(fullname)) {
    error.fullname = "Fullname tidak valid";
  }
  if (!isValidUsername(username)) {
    error.username = "Username tidak valid";
  }

  return error;
}
