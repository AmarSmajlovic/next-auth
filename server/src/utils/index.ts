import * as bcrypt from 'bcrypt';
import { decode } from 'jsonwebtoken';

const isPasswordMatch = async (
  password: string,
  hashedPassword: string,
): Promise<boolean> => {
  return await bcrypt.compare(password, hashedPassword);
};

const generateMaxAgeToken = (expireTime: number) => {
  const currentTime = Math.floor(Date.now() / 1000);
  const maxAge = expireTime - currentTime;
  return maxAge;
};

const generateCookieToken = (name: string, token: string): string => {
  const data = decode(token) as any;
  const expireTime = data.exp;
  return `${name}=${token}; Path=/; Max-Age=${generateMaxAgeToken(expireTime)}`;
};

export { isPasswordMatch, generateCookieToken };
