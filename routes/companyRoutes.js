import { Router } from "express";
import { PrismaClient } from "@prisma/client";

const router = Router();
const prisma = new PrismaClient();

router.get("/", async (req, res) => {
    try {
        const companies = await prisma.company.findMany();
        // Convertir BigInt a string
        const companiesFixed = companies.map(company => ({
            ...company,
            ruc: company.ruc ? company.ruc.toString() : null
        }));
        res.json(companiesFixed);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las empresas" });
    }
});

router.post("/", async (req, res) => {
    try {
        const { name, ruc } = req.body;
        const company = await prisma.company.create(
            {
                data: {
                    name,
                    ruc
                }
            }
        );
        res.status(201).json(company); // 201 significa que se ha creado un nuevo recurso
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Error al obtener las empresas" });
    }
});


export default router;