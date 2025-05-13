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

router.post("/", async (req, res) => {
    try {
        const {
            type,
            status,
            notes,
            scheduleDates,
            leadID,
            templateID,
            companyID,
            userID
        } = req.body;

        const contactLog = await prisma.contactLog.create({
            data: {
                type,
                status,
                notes,
                scheduleDates: scheduleDates ? new Date(scheduleDates) : undefined,
                leadID,
                templateID,
                companyID,
                userID
            }
        });

        res.status(201).json(contactLog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el log de contacto" });
    }
});


export default router;