import bcrypt from "bcrypt";

const saltRounds = process.env.SALT_ROUNDS || 10;

// Hash password
export async function hashPassword(plainPassword) {
  return await bcrypt.hash(plainPassword, saltRounds);
}

// Compare password
export async function isMatch(plainPassword, hashedPassword) {
  return await bcrypt.compare(plainPassword, hashedPassword);
}