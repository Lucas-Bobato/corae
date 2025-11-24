import { Request, Response } from "express";
import * as service from "./users.service";
import { commonValidations } from "@/common/validation/helper.schema";
import { paginationSchema } from "@/common/validation/pagination.schema";

export async function listUsers(_req: Request, res: Response) {
  const { skip, take } = paginationSchema.parse(_req.query);
  const users = await service.listUsers(skip, take);
  res.json(users);
}

export async function getUser(req: Request, res: Response) {
  const user = await service.getUser(Number(req.params.id));
  res.json(user);
}

export async function createUser(req: Request, res: Response) {
  try {
    const { name, email, password } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }
    
    const user = await service.createUser(req.body);
    res.status(201).json(user);
  } catch (error: any) {
    console.error("Erro ao criar usuário:", error);
    if (error.code === 'P2002') {
      return res.status(400).json({ error: "Este email já está cadastrado" });
    }
    res.status(500).json({ error: error.message || "Erro ao criar usuário" });
  }
}

export async function updateUser(req: Request, res: Response) {
  const id = commonValidations.id.parse(req.params.id);

  const user = await service.updateUser(req.body, id);
  res.status(201).json(user);
}

export async function deleteUser(req: Request, res: Response) {
  const id = commonValidations.id.parse(req.params.id);

  await service.deleteUser(id);
  res.status(204).send();
}

export async function login(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    
    if (!email || !password) {
      return res.status(400).json({ error: "Email e senha são obrigatórios" });
    }
    
    const result = await service.login(email, password);
    res.json(result);
  } catch (error: any) {
    console.error("Erro no login:", error);
    res.status(401).json({ error: error.message || "Email ou senha inválidos" });
  }
}

export async function logout(req: Request, res: Response) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(400).json({ error: "No token provided" });
  }
  await service.logout(token);
  res.status(200).json({ message: "Logged out successfully" });
}