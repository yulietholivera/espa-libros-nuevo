// backend/src/index.ts
import express from 'express';
import dotenv from 'dotenv';
import conectarDB from './config/db';
import libroRoutes from './routes/libros'; // ¡Cuidado! Asegúrate que el archivo se llame `libros.ts`
import authRoutes from './routes/auth';   // 👈 ¡Importa la nueva ruta!

dotenv.config();
conectarDB();
const app = express();

// Middleware para que Express entienda JSON
app.use(express.json());

const PORT = process.env.PORT || 3000;

// Usa la puerta de autenticación en la dirección /api/auth
app.use('/api/auth', authRoutes); // 👈 ¡Usa las nuevas rutas!

// Usa la puerta de los libros en la dirección /api/libros
app.use('/api/libros', libroRoutes);

app.get('/', (req, res) => {
  res.send('¡La trastienda de Espa-Libros está funcionando!');
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});