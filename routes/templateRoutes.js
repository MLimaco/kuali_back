import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const templates = await prisma.template.findMany();
        res.json(templates);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las plantillas" });
    }
});

export default router;