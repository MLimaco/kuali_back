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

// Crear un nuevo template
router.post("/", async (req, res) => {
    try {
        const { name, subject, content, type } = req.body;
        const template = await prisma.template.create({
            data: {
                name,
                subject,
                content,
                type
            }
        });
        res.status(201).json(template);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear la plantilla" });
    }
});

export default router;