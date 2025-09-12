// backend/src/routes/libros.ts

import { Router } from 'express';
import {
  obtenerLibros,
  obtenerLibroPorId,
  crearLibro,
  actualizarLibro,
  eliminarLibro
} from '../controllers/libroController';
// 👇 CORRECCIÓN AQUÍ: Importamos los nombres correctos
import { protegerRuta } from '../middlewares/authMiddleware';
import { esAdmin } from '../middlewares/adminMiddleware';

const router = Router();

// --- Rutas Públicas ---
router.get('/', obtenerLibros);
router.get('/:id', obtenerLibroPorId);

// --- Rutas de Administrador ---
// 👇 Y CORRECCIÓN AQUÍ: Usamos los nombres correctos
router.post('/', protegerRuta, esAdmin, crearLibro);
router.put('/:id', protegerRuta, esAdmin, actualizarLibro);
router.delete('/:id', protegerRuta, esAdmin, eliminarLibro);

export default router;