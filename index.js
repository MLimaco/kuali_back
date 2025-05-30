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
// Middleware para habilitar CORS - configuración para desarrollo y producción
const allowedOrigins = [
  process.env.FRONTEND_URL,
  'http://localhost:5173'
].filter(Boolean); // Elimina valores undefined/null

app.use(cors({
  origin: function(origin, callback) {
    // Permite requests sin origin (como apps móviles o Postman)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Bloqueado por CORS'));
    }
  },
  credentials: true // Permite cookies en solicitudes cross-origin
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

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));