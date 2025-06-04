const nameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
const orgNameRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
const orgTypeRegex = /^[a-zA-Z]+(?: [a-zA-Z]+)*$/;
const phoneRegex = /^[6-9]\d{9}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*#?&]{6,}$/;

export const nameValidation = (name) => {
  let error = "";
  if (!name || name.length <= 0) error = " Name is required ";
  else if (!nameRegex.test(name) || name.length < 3)
    error = " Name is not valid ";
  return error;
};

export const orgTypeValidation = (orgType) => {
  let error = "";
  if (!orgType || orgType.length <= 0) error = " Organization Type is required ";
  else if (!orgTypeRegex.test(orgType) || orgType.length < 3)
    error = " Organization Type is not valid ";
  return error;
};

export const orgNameValidation = (orgName) => {
  let error = "";
  if (!orgName || orgName.length <= 0) error = " Organization Name is required ";
  else if (!orgNameRegex.test(orgName) || orgName.length < 3)
    error = " Organization Name is not valid ";
  return error;
};

export const phoneValidation = (number) => {
  let error = "";
  if (!number || number.trim() === "") return "Mobile number is required.";
  if (!phoneRegex.test(number)) return "Enter a valid 10-digit mobile number.";
  return error;
};

export const emailValidation = (email) => {
  let error = "";
  if (!email || email.trim() === "") return "Email is required.";
  if (!emailRegex.test(email)) return "Enter a valid email address.";
  return error;
};

export const passwordValidation = (password) => {
  let error = "";
  if (!password || password.trim() === "") return "Password is required.";
  if (!passwordRegex.test(password))
    return "Password must be at least 6 characters, including a letter and a number.";
  return error;
};

export const confirmPasswordValidation = (password, confirmPassword) => {
  let error = "";
  if (!confirmPassword || confirmPassword.trim() === "")
    return "Please fill the Password.";
  if (password !== confirmPassword) return "Passwords do not match.";
  return error;
};
