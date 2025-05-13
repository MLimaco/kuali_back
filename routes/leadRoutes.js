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

router.post("/", async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            mail,
            phone,
            linkedinProfile,
            rol,
            senority,
            area,
            nextStep,
            status,
            companyID,
            ownerID
        } = req.body;

        const lead = await prisma.lead.create({
            data: {
                firstName,
                lastName,
                mail,
                phone,
                linkedinProfile,
                rol,
                senority,
                area,
                nextStep,
                status,
                companyID,
                ownerID
            }
        });

        res.status(201).json(lead);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el lead" });
    }
});

export default router;