import { Request, Response } from "express";
import * as service from "./reviews.service";
import { commonValidations } from "@/common/validation/helper.schema";
import { paginationSchema } from "@/common/validation/pagination.schema";
import { verifyToken } from "../users/users.repo";

export async function listReviews(_req: Request, res: Response) {
  const { skip, take } = paginationSchema.parse(_req.query);
  const reviews = await service.listReviews(skip, take);
  res.json(reviews);
}

export async function getReview(req: Request, res: Response) {
  const id = commonValidations.id.parse(req.params.id);
  const review = await service.getReview(id);
  res.json(review);
}

export async function createReview(req: Request, res: Response) {
  try {
    const { content, rating, userId, restaurantId } = req.body;
    
    if (!content || !rating || !userId || !restaurantId) {
      return res.status(400).json({ error: "Todos os campos são obrigatórios" });
    }
    
    const review = await service.createReview(req.body);
    res.status(201).json(review);
  } catch (error: any) {
    console.error("Erro ao criar review:", error);
    if (error.message.includes('Rating')) {
      return res.status(400).json({ error: error.message });
    }
    res.status(400).json({ error: error.message || "Erro ao criar avaliação" });
  }
}

export async function deleteReview(req: Request, res: Response) {
  try {
    const id = commonValidations.id.parse(req.params.id);
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) {
      return res.status(401).json({ error: "Token não fornecido" });
    }

    let decoded: any;
    try {
      decoded = verifyToken(token);
    } catch (e: any) {
      return res.status(401).json({ error: "Token inválido ou expirado" });
    }

    const review = await service.getReview(id);
    if (review.userId !== decoded.id) {
      return res.status(403).json({ error: "Você não pode excluir avaliação de outro usuário" });
    }

    await service.deleteReview(id);
    res.status(204).send();
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Erro ao excluir avaliação" });
  }
}