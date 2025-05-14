import bcrypt from "bcrypt";

export const hashValue = async (value, saltRounds) =>
  bcrypt.hash(value, saltRounds || 10);

export const compareValue = async (value, hash) =>
  bcrypt.compare(value, hash).catch(() => false);
