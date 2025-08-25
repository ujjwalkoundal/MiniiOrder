import jwt from "jsonwebtoken";

const TEMP_SECRET = process.env.JWT_TEMP_SECRET;
const PERM_SECRET = process.env.JWT_PERM_SECRET;

// Temporary Token (for OTP verification)
export const generateTempToken = (userId) => {
  return jwt.sign({ userId, type: "temp" }, TEMP_SECRET, { expiresIn: "15m" });
};

// Permanent Token (for login / verified user)
export const generatePermToken = (userId) => {
  return jwt.sign({ userId, type: "perm" }, PERM_SECRET, { expiresIn: "7d" });
};