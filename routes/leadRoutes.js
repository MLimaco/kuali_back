import { Router } from "express";
import { PrismaClient } from '@prisma/client';

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const leads = await prisma.lead.findMany();
        res.json(leads);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los leads' });
    }
});

export default router;