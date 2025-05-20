import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

// Obtener todo el historial
router.get("/", async (req, res) => {
    try {
        const history = await prisma.contactLogHistory.findMany({
            orderBy: { changedAt: "desc" }
        });
        res.json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el historial" });
    }
});

// Obtener historial de un log específico
router.get("/:contactLogID", async (req, res) => {
    try {
        const { contactLogID } = req.params;
        const history = await prisma.contactLogHistory.findMany({
            where: { contactLogID: Number(contactLogID) },
            orderBy: { changedAt: "desc" }
        });
        res.json(history);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el historial del log" });
    }
});

export default router;