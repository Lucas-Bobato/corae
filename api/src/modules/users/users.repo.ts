import prisma from "@/lib/prisma";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { env } from "@/common/utils/envConfig";

const JWT_SECRET = env.JWT_SECRET;
const JWT_EXPIRES_IN = "24h";
const SALT_ROUNDS = 10;
const tokenBlacklist = new Set<string>();

export function list(skip?: number, take?: number) {
  return prisma.users.findMany({ skip, take });
}

export function byId(id: number) {
  return prisma.users.findUniqueOrThrow({ where: { id } });
}

export function findByEmail(email: string) {
  return prisma.users.findUnique({ where: { email } });
}

export async function create(data: { name: string; email: string; password: string; }) {
  const hashedPassword = await bcrypt.hash(data.password, SALT_ROUNDS);

  const user = await prisma.users.create({
    data: {
      name: data.name,
      email: data.email,
      password: hashedPassword
    }
  });

  const token = generateToken(user);

  const { password, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
}

export async function login(email: string, password: string) {
  const user = await findByEmail(email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new Error("Invalid email or password");
  }

  const token = generateToken(user);

  const { password: _, ...userWithoutPassword } = user;
  return { user: userWithoutPassword, token };
}

export function update(data: any, id: number) {
  if (data.password) {
    data.password = bcrypt.hashSync(data.password, SALT_ROUNDS);
  }

  return prisma.users.update({
    where: {
      id: id,
    },
    data,
  });
}

export function deleteUser(id: number) {
  return prisma.users.delete({
    where: {
      id: id,
    },
  });
}

function generateToken(user: { id: number; name: string; email: string; }): string {
  return jwt.sign(
    { id: user.id, name: user.name, email: user.email },
    JWT_SECRET,
    { expiresIn: JWT_EXPIRES_IN }
  );
}

export function verifyToken(token: string) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid or expired token");
  }
}

export async function logout(token: string) {
  tokenBlacklist.add(token);
  return Promise.resolve();
}