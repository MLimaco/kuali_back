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
            leadID,
            companyID,
            userID
        } = req.body;

        const contactLog = await prisma.contactLog.create({
            data: {
                type,
                status,
                notes,
                leadID,
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

// GET un log específico por ID
router.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const contactLog = await prisma.contactLog.findUnique({
            where: { id: Number(id) }
        });
        if (!contactLog) {
            return res.status(404).json({ error: "Log no encontrado" });
        }
        res.json(contactLog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener el log de contacto" });
    }
});

// PATCH para actualizar status, notes y userID, y guardar historial
router.patch("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const { status, notes, userID } = req.body;

        // Obtén el log actual antes de actualizar
        const currentLog = await prisma.contactLog.findUnique({
            where: { id: Number(id) }
        });

        if (!currentLog) {
            return res.status(404).json({ error: "Log no encontrado" });
        }

        // Guarda el estado anterior en el historial
        await prisma.contactLogHistory.create({
            data: {
                contactLogID: currentLog.id,
                status: currentLog.status,
                notes: currentLog.notes,
                userID: currentLog.userID
            }
        });

        // Actualiza el log
        const updatedLog = await prisma.contactLog.update({
            where: { id: Number(id) },
            data: { status, notes, userID }
        });

        res.json(updatedLog);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al actualizar el log de contacto" });
    }
});

export default router;