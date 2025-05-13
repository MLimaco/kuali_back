import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        res.json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener los usuarios" });
    }
});

// Crear un nuevo usuario
router.post("/", async (req, res) => {
    try {
        const { name, email, phone } = req.body;
        const user = await prisma.user.create({
            data: {
                name,
                email,
                phone
            }
        });
        res.status(201).json(user);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al crear el usuario" });
    }
});

export default router;