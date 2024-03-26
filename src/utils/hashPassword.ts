import bcrypt from "bcrypt";

const DEFAULT_SALTS_ROUND = 10;

export const hashPassword = async (password: string): Promise<string> => {
  return bcrypt.hash(password, DEFAULT_SALTS_ROUND);
};

export const isPasswordMath = async (
  plainText: string,
  hashedPassword: string
): Promise<boolean> => {
  return bcrypt.compare(plainText, hashedPassword);
};
