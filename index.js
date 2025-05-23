import express from 'express';
import cors from 'cors'; // <--- Importa cors aquí

import leadsRouter from './routes/leadRoutes.js';
import companyRouter from './routes/companyRoutes.js';
import contactLogRouter from './routes/contactLogRoutes.js';
import templateRouter from './routes/templateRoutes.js';
import userRouter from './routes/userRoutes.js';
import contactLogHistoryRouter from './routes/contactLogHistoryRoutes.js';

import { PrismaClient } from '@prisma/client';


const app = express();
const prisma = new PrismaClient();
// Middleware para habilitar CORS
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use(express.json());

app.get('/', (req, res) => {
    res.send(
        '<h1>Bienvenido a mi Servidor!</h1>'
    );
});

app.use('/api/leads', leadsRouter);
app.use('/api/companies', companyRouter);
app.use('/api/logs', contactLogRouter);
app.use('/api/templates', templateRouter);
app.use('/api/users', userRouter);
app.use('/api/logsHistory', contactLogHistoryRouter);

app.listen(3000, () => console.log('Server is running on port 3000'));