import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const contactLogs = await prisma.contactLog.findMany();
        res.json(contactLogs);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los logs de contacto" });
    }
});

export default router;